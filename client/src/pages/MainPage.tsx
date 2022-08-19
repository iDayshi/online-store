import React, { useEffect } from "react";
import SideBar from "../components/ui/sideBar/sideBar";
import PhoneCard from "../components/ui/phoneCard";
import { getPhonesLoadingStatus, loadingPhonesList } from "../store/phones";
import { useDispatch, useSelector } from "react-redux";

function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(loadingPhonesList());
  }, []);
  const isLoading = useSelector(getPhonesLoadingStatus());

  return (
    <>
      <div className="h-screen">
        <div className="flex justify-center max-h-min pb-20">
          <SideBar />
          <div className="bg-white items-center justify-center">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {isLoading ? <div className="flex items-center justify-center">Loading....</div> : <PhoneCard />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
