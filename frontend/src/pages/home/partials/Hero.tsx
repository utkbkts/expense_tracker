import { motion } from "framer-motion";
import { FolderClosed, Loader, Play, Users } from "lucide-react";
import { VscGithubAlt } from "react-icons/vsc";

import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const bottomLeftLightVariants = {
  initial: {
    opacity: 0.3,
    x: -500,
    y: 500,
    scale: 0.8,
  },
  animate: {
    opacity: 0.8,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const topRightLightVariants = {
  initial: {
    opacity: 0.3,
    x: 500,
    y: -500,
    scale: 0.8,
  },
  animate: {
    opacity: 0.8,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black-400">
      <motion.div
        className="light light-bottom-left xl:block hidden"
        variants={bottomLeftLightVariants}
        initial="initial"
        animate="animate"
      />

      <motion.div
        className="light light-top-right xl:block hidden"
        variants={topRightLightVariants}
        initial="initial"
        animate="animate"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-4xl font-bold text-white flex flex-col gap-5 text-center items-center justify-center">
        {/* Sol köşe parantezi */}
        <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }} className="absolute left-0 top-42 transform -translate-y-1/2 hidden flex-col items-start gap-2 2xl:flex">
          <span className="text-black-200 text-6xl font-mono">[</span>
        </motion.div>

        <div className="space-y-6 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
            className="md:text-5xl text-[18px] font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            Check all your accounts
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
            className="md:text-4xl text-[18px] font-semibold opacity-90"
          >
            And do it <span className="text-cyan-400 font-bold">for free</span>
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
            className="md:text-2xl text-[18px] leading-relaxed text-gray-300 font-medium"
          >
            Your budget is now under control with our monthly account monitoring
            system.
          </motion.h1>
        </div>
        {/* Sağ köşe parantezi */}
        <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
        className="absolute right-0 top-42 transform -translate-y-1/2 hidden flex-col items-end gap-2 2xl:flex">
          <span className="text-black-200 text-6xl font-mono">]</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1.4 }}
          className="flex items-center justify-center gap-7 text-[16px] md:flex-row flex-col"
        >
          <button className="relative bg-gradient-to-br from-black-200 to-black-400 px-6 py-4  cursor-pointer overflow-hidden group active:[scale:0.92] transition-all duration-300">
            {/* Sol Alt */}
            <span className="absolute bottom-0 left-0 w-0 h-0 border-t-[12px] border-l-[14px] border-t-black-400 border-l-transparent rotate-[-180deg]"></span>
            {/* Sağ Üst */}
            <span className="absolute top-0 right-0 w-0 h-0  border-t-[12px] border-l-[12px] border-t-black-400 border-l-transparent "></span>
            {/* Sol Üst */}
            <span className="absolute top-1 left-1 w-0 h-0 border-b-[12px] border-r-[12px] border-b-black border-r-transparent rotate-90 group-hover:top-3 group-hover:left-4 transition-all duration-300"></span>
            {/* Sağ Alt */}
            <span className="absolute bottom-1 right-1 w-0 h-0 border-b-[12px] border-r-[12px] border-b-black border-r-transparent -rotate-90 group-hover:bottom-2 group-hover:right-4 transition-all duration-300"></span>
            Get in Touch
          </button>

          <span className="flex items-center gap-2 transition-all duration-300 group cursor-pointer text-xl">
            <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-red-400 transition-all duration-500">
              Watch Demo Videos
            </span>
            <Play
              className="bg-gradient-to-br from-black-200 to-black-400 rounded-full p-1 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
              size={25}
            />
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1.8 }}
        >
          <p className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            officia saepe rerum, nemo, vel consectetur architecto ea facilis
            maiores atque alias. Quo doloremque voluptas rem magnam quam natus
            porro quia error neque nam expedita cupiditate impedit eius
            veritatis sunt commodi repudiandae ad delectus tenetur, enim
            dolores. Fugit cupiditate praesentium odio.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1.8 }}
          className="flex items-center gap-12"
        >
          <div className=" flex items-center gap-6">
            <div className="relative text-yellow-op">
              <FolderClosed size={35} />
              <div className="absolute -top-4 -right-4">
                <Loader size={20} />
              </div>
            </div>
            <div className="flex flex-col md:items-start items-center">
              <h1 className="md:text-[18px] text-sm">$5.1 M</h1>
              <span className="text-gray-400 text-sm ">Assets Secured</span>
            </div>
          </div>
          <span className="h-[50px] w-[1px] bg-white block"></span>
          <div>
            <span className="flex items-center gap-2">
              <Users size={35} className="text-yellow-op" />
              <div className="flex flex-col md:items-start items-center">
                <span className="md:text-[18px] text-sm">140K+</span>
                <p className="text-gray-400 text-sm">New Users</p>
              </div>
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 2.2 }}
          className="flex items-center gap-2 relative"
        >
          <h1 className="text-sm text-gray-400">
            Stay in touch with us
            <br />
            on social networks
          </h1>
          <div className="flex items-center">
            <div>
              <VscGithubAlt
                size={45}
                className="border border-gray-400 bg-black/90  cursor-pointer hover:scale-110 transition-all duration-300  rounded-full p-2"
              />
            </div>
            <div className="-mx-2">
              <BsTwitterX
                size={45}
                className="border border-gray-400 bg-black/90  cursor-pointer hover:scale-110 transition-all duration-300  rounded-full p-2"
              />
            </div>
            <FaFacebookF
              size={45}
              className="border border-gray-400 bg-black/90  cursor-pointer hover:scale-110 transition-all duration-300 rounded-full p-2"
            />
          </div>
          <FaChevronRight className="absolute top-[-14px] right-[-44px] text-xs text-white rotate-320" />
          <FaChevronLeft className="absolute bottom-[-20px] left-[-40px] text-xs text-white  rotate-320" />

          <FaChevronRight className="absolute top-[-14px] left-[-40px] text-xs text-white rotate-220" />
          <FaChevronLeft className="absolute bottom-[-20px] right-[-40px] text-xs text-white  rotate-220" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
