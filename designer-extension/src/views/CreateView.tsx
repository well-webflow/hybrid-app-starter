import Button from '../components/UI/Button';
import Heading from '../components/UI/Heading';
import Navigation from '../components/Waterfall/Navigation';
import { convertToWaterfallEl } from '../lib/functions';
import { defaultWaterfallSettings } from '../lib/waterfallSettings';

export default function CreateView() {
  return (
    <div>
      <Navigation />
      <div className="p-5">
        <Heading level={1} className="mb-10">
          Create Elements
        </Heading>
        {defaultWaterfallSettings.map((group) => (
          <div key={group.name}>
            {group.actions && (
              <div className="mb-10">
                <Heading level={2} className="text-primary mb-3">
                  {group.name}
                </Heading>
                <div className="flex flex-row gap-3">
                  {group.actions.map((action) => (
                    <Button
                      key={action.attr}
                      onClick={async () =>
                        await convertToWaterfallEl(action.attr, action.label)
                      }
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
