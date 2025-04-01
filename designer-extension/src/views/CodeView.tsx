import { useEffect } from 'react';
import Button from '../components/UI/Button';
import Heading from '../components/UI/Heading';
import { useAuth } from '../hooks/useAuth';
import { useScriptRegistration } from '../hooks/useCustomCode';
import { useScriptSelection } from '../hooks/useCustomCode';
import { useSites } from '../hooks/useSites';
import { CircularProgress } from '@mui/material';
import { ScriptsList } from '../components/CustomCode';
import { CustomCode } from '../types/types';

export default function CodeView() {
  // Auth and sites
  const { sessionToken } = useAuth();
  const {
    currentSite,
    isCurrentSiteLoading,
    isLoading: isSitesLoading,
  } = useSites(sessionToken, true);

  const { registeredScripts, fetchScripts, selectScript, applyScript } =
    useScriptSelection();

  const { registerScript, isRegistering, checkIfCodeRegistered } =
    useScriptRegistration(sessionToken || '', currentSite?.id || '');

  // Fetch scripts when this tab is opened or when site/session changes
  useEffect(() => {
    if (currentSite?.id && sessionToken) {
      fetchScripts(currentSite.id, sessionToken);
    }
  }, [currentSite?.id, sessionToken, fetchScripts]);

  // Show loading state while sites are being fetched
  if (isCurrentSiteLoading || isSitesLoading) {
    return (
      <div className="w-full p-2 text-center">
        <CircularProgress size={20} sx={{ mr: 1 }} />
        Loading site information...
      </div>
    );
  }

  // Show message if no current site is available
  if (!currentSite) {
    return (
      <div className="w-full p-2">
        Unable to load site information. Please make sure you're in a Webflow
        Designer session.
      </div>
    );
  }

  /**
   * Handles the submission of new script registration
   * Validates input and calls the onRegister callback
   */
  const handleSubmit = async () => {
    if (!currentSite) return;

    // 1. Get all of the registered scripts on the site
    console.log('REGISTERED SCRIPTS:');
    console.log(registeredScripts);

    // 2. Check if the Waterfall script is already registered
    const already_registered = await checkIfCodeRegistered(registeredScripts);
    if (already_registered) {
      webflow.notify({
        type: 'Info',
        message: 'Waterfall script is already registered',
      });
      return;
    }

    // 3. If not registered, register the Waterfall script
    let code =
      'https://cdn.jsdelivr.net/npm/well-waterfall@0.4.3/dist/waterfall.js';
    await handleRegisterCode(code, true);

    // 4. Apply the Waterfall script to the site
    await handleApplyCode('header');
  };

  /**
   * Handles the registration of new custom code
   * @param code - The custom code to register
   * @param isHosted - Whether the code is hosted externally
   */
  const handleRegisterCode = async (code: string, isHosted: boolean) => {
    try {
      const res = await registerScript(code, isHosted);
      console.log(res);
      await fetchScripts(currentSite?.id || '', sessionToken || '');
      await handleApplyCode('header');
      webflow.notify({
        type: 'Success',
        message: 'Script registered successfully',
      });
    } catch (error) {
      webflow.notify({
        type: 'Error',
        message: 'ERROR: ' + error,
      });
    }
  };

  /**
   * Handles applying the selected script to the site
   * The mutation in useScriptSelection will automatically:
   * - Apply the script via the API
   * - Invalidate the status cache
   * - Trigger a refetch of the status
   */
  const handleApplyCode = async (location: 'header' | 'footer') => {
    if (!currentSite) return;

    try {
      await handleApplyToSite('site', currentSite.id, location, sessionToken);
      // Status will automatically update via React Query's cache invalidation
    } catch (error) {
      console.error('Error applying code to site:', error);
    }
  };

  /**
   * Wrapper for applying scripts to site
   */
  const handleApplyToSite = (
    targetType: 'site',
    targetId: string,
    location: 'header' | 'footer',
    sessionToken: string
  ) => {
    return applyScript({
      targetType,
      targetId,
      location,
      sessionToken,
    });
  };

  return (
    <div className="p-5">
      <Heading level={1}>Code</Heading>
      <Button onClick={handleSubmit}>Click Me</Button>
    </div>
  );
}
