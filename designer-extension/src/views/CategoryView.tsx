import Heading from '../components/UI/Heading';
import BasicSetting from '../components/Waterfall/BasicSetting';
import Navigation from '../components/Waterfall/Navigation';
import { useWaterfallContext } from '../context/waterfallContext';

export default function CategoryView() {
  const { selectedCategory, waterfallSettings } = useWaterfallContext();

  if (!selectedCategory || !waterfallSettings) return null;

  const category = waterfallSettings.find(
    (category) => category.id.toLowerCase() === selectedCategory.toLowerCase()
  );
  if (!category) return;

  const groups = category.groups || [];
  const filteredProps = category.items || [];

  if (category)
    return (
      <>
        <Navigation />
        <div className="p-5">
          <Heading level={2} className="text-xl font-semibold mb-2">
            {category.name}
          </Heading>
          <p className="mb-5 text-gray-300">{category.description}</p>
          <SettingSection>
            <div className="flex flex-col gap-4">
              {filteredProps.map((prop) => (
                <BasicSetting key={prop.name} prop={prop} />
              ))}
            </div>
          </SettingSection>
          {groups.map((group) => (
            <SettingSection>
              <div className="flex flex-col gap-4">
                <Heading level={3}>{group.name}</Heading>
                {group.items.map((item) => (
                  <BasicSetting key={item.name} prop={item} />
                ))}
              </div>
            </SettingSection>
          ))}
        </div>
      </>
    );
}

type SettingSectionProps = {
  children: React.ReactNode;
};

function SettingSection({ children }: SettingSectionProps) {
  return (
    <div className="border-b border-t border-border1 py-8">{children}</div>
  );
}
