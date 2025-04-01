import { useWaterfallContext } from '../context/waterfallContext';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from '../components/Waterfall/Navigation';
import Button from '../components/UI/Button';

export default function EditView() {
  const { setSelectedCategory, waterfallSettings } = useWaterfallContext();

  const navigate = useNavigate();

  function goToCategory(selectedCategory: string) {
    setSelectedCategory(selectedCategory);
    navigate(`/edit/${selectedCategory}`);
  }

  return (
    <div className="">
      <Navigation />
      <div className="p-2">
        <div className="space-y-3">
          {waterfallSettings?.map((category) => (
            <Button
              key={category.id}
              onClick={() => goToCategory(category.id)}
              className="w-full"
            >
              <div className="flex flex-row items-center text-left gap-4">
                {category.icon && (
                  <div className="bg-primary-dark w-8 h-8 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={category.icon}
                      className="text-white"
                    />
                  </div>
                )}
                <div className="">
                  <div className="text-base font-bold">{category.name}</div>
                  <div className="text-sm text-text2">{category.summary}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
