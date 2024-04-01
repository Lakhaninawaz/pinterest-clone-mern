import { CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';

import { Autoplay } from 'swiper/modules';

// // init Swiper:
// const swiper = new Swiper('.swiper', {
//   direction: 'vertical',
//   // loop: true,
//   // slidesPerView: 5,
//         spaceBetween: 10,
//         autoplay: {
//             delay: 600,
//             disableOnInteraction: false,
//           },
// });


const Home = () => {

  return (
    <>
      <div className='w-full h-screen bg-zinc-50 flex items-center justify-center'>

        {/* <div className="p-4 bg-white rounded-lg shadow-md">
      <a href={`/post/${post._id}`}> {/* Link to full post details

      </a>
      <div className="p-4 flex flex-col space-y-2">
        
        </div>
      </div>
    </div> */}
        <div className="flex flex-col md:flex-row w-full h-full items-center justify-center relative">
          <div className=" left z-10 px-5 w-full md:w-[60vw] lg:w-[50vw] h-full flex items-center justify-center ">
            <h1 className="text-[9vmax] sm:text-[8vmax] md:text-[6vmax] text-center md:text-start font-medium text-gray-900">
              Discover and share inspiring ideas.
            </h1>

          </div>
          <div className="md:px-10 right w-full h-full bg-transparent absolute md:static md:h-screen md:w-[40vw] lg:w-[50vw] bg-white overflow-hidden">
            {/* <!-- Slider main container --> */}
            <Swiper
              className="mySwiper w-full h-full md:w-full md:h-screen"
              direction="vertical"
              slidesPerView={'auto'}
              mousewheel={true}
              speed={2000}
              // freeMode={true}
              // slidesPerGroup={2}
              loop={true}
              centeredSlides={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              coverflow= {{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
              }}
              allowTouchMove={false}
              spaceBetween={50}
              // Responsive breakpoints
              // breakpoints={{
              //   // when window width is >= 320px
              //   320: {
              //     // slidesPerView: 3,
              //     spaceBetween: 100
              //   },
              //   // when window width is >= 480px
              //   480: {
              //     // slidesPerView: 3,
              //     spaceBetween: 0
              //   },
              //   // when window width is >= 640px
              //   640: {
              //     // slidesPerView: 3,
              //     spaceBetween: 100
              //   },
              //   768: {
              //     slidesPerView: 'auto',
              //     spaceBetween: 50
              //   }
              // }
              // }

              modules={[Autoplay, Pagination, Navigation]}
            >
              <SwiperSlide className="w-full h-[40%] mt-0 md:mt-0">
                <div
                  className="md:relative w-full h-full cards flex flex-wrap items-start justify-start sm:items-start sm:justify-start ">
                  <div className="absolute card cursor-pointer">
                    <div className="w-52 h-40 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://source.unsplash.com/random/?city,night"
                        alt="img" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full h-[40%] mt-0 md:mt-0">
                <div
                  className="md:relative w-full h-full cards flex flex-wrap items-start justify-start sm:items-start sm:justify-start">
                  <div className="absolute right-0  card cursor-pointer">
                    <div className="w-52 h-60 top-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://source.unsplash.com/random/?creative"
                        alt="img"
                        loading={<CircularProgress/>} 
                        />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full h-[40%] mt-0 md:mt-0">
                <div
                  className="md:relative w-full h-full cards flex flex-wrap items-start justify-start sm:items-start sm:justify-start">
                  <div className="absolute card cursor-pointer">
                    <div className="w-52 h-40 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://source.unsplash.com/random/?think"
                        alt="img" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full h-[40%] mt-0 md:mt-0">
                <div
                  className="md:relative w-full h-full cards flex flex-wrap items-start justify-start sm:items-start sm:justify-start">
                  <div className="absolute right-0 card cursor-pointer ">
                    <div className="w-52 h-40 top-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://source.unsplash.com/random/?city,night"
                        alt="img" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full h-[40%] mt-0 md:mt-0">
                <div
                  className="md:relative w-full h-full cards flex flex-wrap items-start justify-start sm:items-start sm:justify-start">
                  <div className="absolute card cursor-pointer">
                    <div className="w-52 h-60 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://source.unsplash.com/random/?creative"
                        alt="img" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full h-[40%] mt-0 md:mt-0">
                <div
                  className="md:relative w-full h-full cards flex flex-wrap items-start justify-start sm:items-start sm:justify-start">
                  <div className="absolute right-0 card cursor-pointer">
                    <div className="w-52 h-40 top-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://source.unsplash.com/random/?think"
                        alt="img" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full h-[40%] mt-0 md:mt-0">
                <div
                  className="md:relative w-full h-full cards flex flex-wrap items-start justify-start sm:items-start sm:justify-start">
                  <div className="absolute card cursor-pointer">
                    <div className="w-52 h-40 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://source.unsplash.com/random/?city,night"
                        alt="img" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full h-[40%] mt-0 md:mt-0">
                <div
                  className="md:relative w-full h-full cards flex flex-wrap items-start justify-start sm:items-start sm:justify-start">
                  <div className="absolute right-0 card cursor-pointer">
                    <div className="w-52 h-60 top-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://source.unsplash.com/random/?creative"
                        alt="img" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
{/* <SwiperSlide className="w-full h-full mt-32 sm:mt-10 md:mt-32">
                <div
                  className="md:relative w-full h-full cards flex flex-wrap items-start justify-start sm:items-start sm:justify-start">
                  <div className="absolute right-0 top-2/3 card cursor-pointer">
                    <div className="w-52 h-40 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://source.unsplash.com/random/?think"
                        alt="img" />
                    </div>
                  </div>
                </div>
              </SwiperSlide> */}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home