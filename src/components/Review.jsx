import React from "react";
import person1 from "../assets/person1.png";
import person2 from "../assets/person2.png";
import person3 from "../assets/person3.png";
import star from "../assets/star.png";

function Review() {
  let userReview = [
    {
      userImage: [person1],
      userName: "Rohan De Spond",
      userReview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Curabitur have is covered many vulputate vestibulum Phasellus rhoncus, dolor eget viverra pretium dolor tellus aliquet nunc, vitae ultricies erat elit eu lacus",
      userRating: "5.0",
      date: "25 JAN 2021",
    },
    {
      userImage: [person2],
      userName: "Rohan De Spond",
      userReview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Curabitur have is covered many vulputate vestibulum Phasellus rhoncus, dolor eget viverra pretium dolor tellus aliquet nunc, vitae ultricies erat elit eu lacus",
      userRating: "5.0",
      date: "25 JAN 2021",
    },
    {
      userImage: [person3],
      userName: "Rohan De Spond",
      userReview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Curabitur have is covered many vulputate vestibulum Phasellus rhoncus, dolor eget viverra pretium dolor tellus aliquet nunc, vitae ultricies erat elit eu lacus",
      userRating: "5.0",
      date: "25 JAN 2021",
    },
  ];

  return (
    <div className="ms-5 me-5 mt-16 md:ms-20 md:me-20 md:mt-32 md:pb-24">
      <div className="flex flex-wrap gap-16">
        <div className="flex w-90vw md:basis-[60%] flex-wrap flex-grow flex-col justify-between">
          <div className="flex flex-col gap-4 mb-5 md:flex-row justify-between">
            <p className="font-semibold text-xl md:text-2xl">
              <span className="me-3">|</span>Client's Review
            </p>

            <div className="flex gap-5 items-start">
              <p className=" text-lg">6 Reviews</p>
              <div className="flex flex-col">
                <div className="flex gap-2 text-lg font-semibold justify-between">
                  <p className="text-yellow-500/80 italic font-bold">s</p>
                  <p className="text-yellow-500/80 italic font-bold">s</p>
                  <p className="text-yellow-500/80 italic font-bold">s</p>
                  <p className="text-yellow-500/80 italic font-bold">s</p>
                  <p className="text-gray-300 font-semibold">s</p>
                </div>
                <div className="flex gap-2 text-lg font-semibold justify-between">
                  <p className="text-yellow-500/80 italic font-bold">t</p>
                  <p className="text-yellow-500/80 italic font-bold">t</p>
                  <p className="text-yellow-500/80 italic font-bold">t</p>
                  <p className="text-yellow-500/80 italic font-bold">t</p>
                  <p className="text-gray-300 font-semibold">t</p>
                </div>
                <div className="flex gap-2 text-lg font-semibold justify-between">
                  <p className="text-yellow-500/80 italic font-bold">a</p>
                  <p className="text-yellow-500/80 italic font-bold">a</p>
                  <p className="text-yellow-500/80 italic font-bold">a</p>
                  <p className="text-yellow-500/80 italic font-bold">a</p>
                  <p className="text-gray-300 font-semibold">a</p>
                </div>
                <div className="flex gap-2 text-lg font-semibold justify-between">
                  <p className="text-yellow-500/80 italic font-bold">r</p>
                  <p className="text-yellow-500/80 italic font-bold">r</p>
                  <p className="text-yellow-500/80 italic font-bold">r</p>
                  <p className="text-yellow-500/80 italic font-bold">r</p>
                  <p className="text-gray-300 font-semibold">r</p>
                </div>
              </div>
            </div>
          </div>

          {userReview.map((item, index) => (
            <div key={index} className="flex gap-5 w-90vw md:w-3/4 pb-12">
              <img src={item.userImage} alt="" className="w-[60px] h-[60px] md:w-[76px] md:h-[76px]" />

              <div className="flex flex-col gap-4">
                <p className="font-semibold text-lg">{item.userName}</p>
                <p className="text-gray-500 ">{item.userReview}</p>
                <div className="flex gap-x-5">
                  <div className="flex gap-1">
                    <img src={star} alt="" className="object-contain w-4" />
                    <img src={star} alt="" className="object-contain w-4" />
                    <img src={star} alt="" className="object-contain w-4" />
                    <img src={star} alt="" className="object-contain w-4" />
                    <img src={star} alt="" className="object-contain w-4" />
                  </div>

                  <p className="font-semibold">{item.userRating}</p>
                </div>

                <div>
                  <p className="text-gray-500">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className=" flex-grow md:basis-[30%] flex flex-col justify-start gap-12 md:gap-64">
          <p className="font-semibold">(4.8 out of 5)</p>

          <div className='mx-auto border-8 h-48 w-48 flex flex-col justify-center items-center border-sky-800 rounded-full'>
                    <p>Overall Ratings</p>
                    <p className='font-semibold text-2xl text-sky-800'>4.8</p>
                    <p>Out of 5</p>
               </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
