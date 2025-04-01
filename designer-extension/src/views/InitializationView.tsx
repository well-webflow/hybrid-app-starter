import {
  faComputer,
  faPenToSquare,
  faPlus,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { useWaterfallContext } from '../context/waterfallContext';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Button from '../components/UI/Button';
import Heading from '../components/UI/Heading';

export default function InitializationView() {
  const { createWaterfall, loadWaterfall, elementSelected, waterfallSelected } =
    useWaterfallContext();

  const navigate = useNavigate();

  useEffect(() => {
    webflow.setExtensionSize('large');
  });

  function loadAndEditWaterfall() {
    loadWaterfall();
    navigate('/edit');
  }

  return (
    <div className="h-screen flex flex-col">
      <InitializationHeader />
      <div className="p-5 border-t-2 border-t-border1 h-full">
        {elementSelected ? (
          <div className="py-2 grid grid-cols-3 gap-4 items-center justify-stretch w-full h-full">
            <div className="border border-dashed border-border2 p-5 flex-grow h-full flex flex-col justify-center items-center">
              <Button
                icon={faPlus}
                onClick={createWaterfall}
                color="primary"
                className="w-full"
              >
                Create New Waterfall
              </Button>
            </div>
            <div className="border border-dashed border-border2 p-5 flex-grow h-full flex flex-col justify-center items-center">
              <Button icon={faPlusSquare} onClick={() => navigate('/create')}>
                Create Elements
              </Button>
            </div>
            <div className="border border-dashed border-border2 p-5 flex-grow h-full flex flex-col justify-center items-center">
              <Button icon={faComputer} onClick={() => navigate('/code')}>
                Add Code
              </Button>
            </div>
            <div className="border border-dashed border-border2 p-5 flex-grow h-full flex flex-col justify-center items-center">
              <Button icon={faComputer} onClick={() => navigate('/code-ex')}>
                Code Example
              </Button>
            </div>
            <div className="border border-dashed border-border2 p-5 flex-grow h-full flex flex-col justify-center items-center text-center">
              {!waterfallSelected ? (
                <>
                  <span>or</span>
                  <span>
                    Select an existing{' '}
                    <span className="text-primary">Waterfall</span>
                  </span>
                </>
              ) : (
                <Button
                  icon={faPenToSquare}
                  onClick={() => loadAndEditWaterfall()}
                  color="secondary"
                >
                  Edit {waterfallSelected}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="">
            <Heading level={2}>Select An Element</Heading>
            <p>
              Please select an <span className="text-primary">Element</span> to
              begin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InitializationHeader() {
  return (
    <>
      <div className="w-full border border-border1 p-5 flex flex-row justify-between">
        <img
          src="/wellflow-logo-white.svg"
          alt="Wellflow Logo"
          width={80}
          height={20}
          className=""
        />
        <Button color="secondary">Donate</Button>
      </div>
      <div className="p-5">
        <Heading
          level={1}
          className="text-5xl text-primary font-bold font-brand"
        >
          Waterfall
        </Heading>
        <p className="text-sm">
          Waterfall is a wrapper around SwiperJS (11.1.14) that allows for full
          swiper customization using attributes with a sensible builder.
        </p>
      </div>
    </>
  );
}
