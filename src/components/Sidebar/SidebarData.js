import React from "react";
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  // {
  //   title: "Students",
  //   path: "/about-us",
  //   icon: <AiIcons.AiOutlineUser />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  // },
  {
    title: "Courses",
    path: "/Courses",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },

  // {
  //   title: "Enrolled Courses",
  //   path: "/events",
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  // },
  // {
  //   title: "Contact",
  //   path: "/contact",
  //   icon: <FaIcons.FaPhone />,
  // },
  // {
  //   title: "Support",
  //   path: "/support",
  //   icon: <IoIcons.IoMdHelpCircle />,
  // },

  {
    title: "Settings",
    path: "/settings",
    icon: <IoIcons.IoMdSettings />,
  },
  // {
  //   title: "Logout",
  //   path: "/support",
  //   icon: <IoIcons.IoMdExit />,
  // },
];
