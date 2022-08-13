import React from "react";
import SideBar from "../components/ui/sideBar";
import PhoneCard from "../components/ui/phoneCard";
import NotFound from "../components/ui/notFound";
import { getPhones } from "../store/phonesStore";
import { useSelector } from "react-redux";

function MainPage() {
  const phones = useSelector(getPhones());

  return (
    <>
      <div className="h-screen">
        <div className="flex justify-center max-h-min">
          <SideBar />
          <div className="bg-white items-center justify-center">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {phones.length ? (
// @ts-ignore
                  <PhoneCard phones={phones} />
                ) : (
                  <div className="flex items-center justify-center">
                    <NotFound />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
