'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  const frontendSkills = [
    { 
      name: 'HTML', 
      color: 'orange-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#e34c26">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
        </svg>
      )
    },
    { 
      name: 'CSS', 
      color: 'blue-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1572b6">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
        </svg>
      )
    },
    { 
      name: 'JavaScript', 
      color: 'yellow-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#f7df1e">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      )
    },
    { 
      name: 'React', 
      color: 'cyan-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#61dafb">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
        </svg>
      )
    },
    { 
      name: 'Next.js', 
      color: 'gray-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#000000">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 7.34c.496 1.005.78 2.266.78 3.781 0 .893-.094 1.748-.272 2.557-.178.808-.438 1.569-.78 2.274-.342.705-.777 1.349-1.302 1.924-.525.575-1.143 1.074-1.847 1.493-.704.418-1.497.743-2.378.97-.881.228-1.861.342-2.941.342-1.08 0-2.06-.114-2.941-.342-.881-.227-1.674-.552-2.378-.97-.704-.419-1.322-.918-1.847-1.493-.525-.575-.96-1.219-1.302-1.924-.342-.705-.602-1.466-.78-2.274C6.422 13.748 6.328 12.893 6.328 12c0-1.515.284-2.776.78-3.781.496-1.005 1.155-1.847 1.976-2.513.821-.666 1.784-1.161 2.888-1.487C11.075 4.892 12.24 4.73 13.448 4.73c1.208 0 2.373.162 3.476.489 1.104.326 2.067.821 2.888 1.487.821.666 1.48 1.508 1.976 2.513z"/>
          <path d="M8.5 8.5L15.5 15.5M8.5 15.5L15.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 6v12M6 12h12" stroke="white" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      name: 'Tailwind CSS', 
      color: 'teal-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#06b6d4">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
        </svg>
      )
    },
    { 
      name: 'TypeScript', 
      color: 'indigo-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#3178c6">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
        </svg>
      )
    },
    { 
      name: 'Git', 
      color: 'red-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#f05032">
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
        </svg>
      )
    }
  ];

  const dataSkills = [
    { 
      name: 'Python', 
      color: 'blue-600',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#3776ab">
          <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
        </svg>
      )
    },
    { 
      name: 'SQL', 
      color: 'blue-600',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#336791">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16H8v-2h2v2zm0-3H8V9h2v4zm6 3h-2v-2h2v2zm0-3h-2V9h2v4z"/>
          <rect x="6" y="6" width="12" height="2" fill="#336791"/>
          <rect x="6" y="16" width="12" height="2" fill="#336791"/>
          <path d="M8 10h8v4H8z" fill="none" stroke="#336791" strokeWidth="1"/>
        </svg>
      )
    },
    { 
      name: 'Pandas', 
      color: 'purple-600',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#150458">
          <path d="M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v2.568h-2.623zm0 14.074h2.623V24h-2.623zM4.456 5.896h2.622V24H4.456zm4.213 2.568h2.623v2.57H8.67zm0 7.037h2.623v2.568H8.67z"/>
        </svg>
      )
    },
    { 
      name: 'NumPy', 
      color: 'slate-600',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#013243">
          <path d="M10.315 4.876L8.847 5.7l-4.637-2.68L2.77 4.282l4.637 2.68L5.938 8.225 1.3 5.544l-1.44.832 4.637 2.68-1.47.848L0 7.224v1.664l3.027 1.748v3.496L0 15.88v1.664l3.027-1.748 1.47.848L0 19.324l1.44.832 4.637-2.68 1.469.848-4.637 2.68 1.44.832 4.637-2.68L10.315 19.124l-4.637 2.68 1.44.832L12 20.888l4.882 2.748 1.44-.832-4.637-2.68L15.154 19.124l4.637 2.68 1.44-.832-4.637-2.68 1.469-.848 4.637 2.68L24 19.324l-3.027-1.748 1.47-.848L24 19.408v-1.664l-3.027-1.748v-3.496L24 10.752V9.088l-3.027 1.748-1.47-.848L24 7.308l-1.44-.832-4.637 2.68L16.454 8.308l4.637-2.68L19.651 4.796l-4.637 2.68L13.685 6.628l4.637-2.68L16.882 3.116 12 5.864 7.118 3.116l-1.44.832 4.637 2.68z"/>
        </svg>
      )
    },
    { 
      name: 'Matplotlib', 
      color: 'blue-700',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#11557c">
          <path d="M12.5 0C5.596 0 0 5.596 0 12.5S5.596 25 12.5 25 25 19.404 25 12.5 19.404 0 12.5 0zm0 2.5c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z"/>
          <path d="M8.5 7.5h8v1.5h-8zm0 3h8v1.5h-8zm0 3h8v1.5h-8zm0 3h5v1.5h-5z" fill="#ff7f0e"/>
          <circle cx="6" cy="8.25" r="0.75" fill="#1f77b4"/>
          <circle cx="6" cy="11.25" r="0.75" fill="#ff7f0e"/>
          <circle cx="6" cy="14.25" r="0.75" fill="#2ca02c"/>
          <circle cx="6" cy="17.25" r="0.75" fill="#d62728"/>
        </svg>
      )
    },
    { 
      name: 'Power BI', 
      color: 'yellow-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#F2C811">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
          <rect x="6" y="8" width="3" height="8" fill="#F2C811"/>
          <rect x="10.5" y="6" width="3" height="10" fill="#F2C811"/>
          <rect x="15" y="10" width="3" height="6" fill="#F2C811"/>
          <path d="M6 8h3v8H6zm4.5-2h3v10h-3zm4.5 4h3v6h-3z" fill="#E6B800"/>
        </svg>
      )
    },
    { 
      name: 'Excel', 
      color: 'green-600',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#217346">
          <path d="M21.53 4.306v15.363H2.47V4.306h19.06M22.5 3.333H1.5c-.46 0-.833.373-.833.833v15.667c0 .46.373.833.833.833h21c.46 0 .833-.373.833-.833V4.167c0-.46-.373-.834-.833-.834z"/>
          <path d="M7.677 11.69L5.31 8.174H6.88l1.31 2.12c.124.2.24.38.35.54h.02c.13-.18.26-.36.39-.54l1.38-2.12h1.51l-2.4 3.5 2.56 3.85H10.88l-1.48-2.32c-.14-.22-.26-.42-.37-.62h-.02c-.12.2-.25.4-.37.62L7.155 15.54H5.565l2.112-3.85z"/>
        </svg>
      )
    },
    { 
      name: 'Tableau', 
      color: 'orange-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#E97627">
          <path d="M11.654 0.174v4.604h-1.33V0.174h1.33zm6.78 2.377v1.33h-4.604v-1.33h4.604zM7.57 2.551v1.33H2.966v-1.33H7.57zm4.084 3.541v8.539h-1.33V6.092h1.33zm8.112 0.697v1.33h-6.781v-1.33h6.781zM5.393 6.789v1.33H-1.388v-1.33h6.781zm6.261 2.377v4.604h-1.33V9.166h1.33zm4.604 0.697v1.33h-3.274v-1.33h3.274zM8.9 9.863v1.33H5.626v-1.33H8.9zm2.754 2.377v4.604h-1.33v-4.604h1.33zm6.781 0.697v1.33h-5.451v-1.33h5.451zM3.663 12.937v1.33H-1.788v-1.33h5.451zm7.991 2.377v4.604h-1.33v-4.604h1.33zm4.604 0.697v1.33h-3.274v-1.33h3.274zM8.9 16.011v1.33H5.626v-1.33H8.9zm2.754 2.377v4.604h-1.33v-4.604h1.33zm6.781 0.697v1.33h-5.451v-1.33h5.451zM3.663 19.085v1.33H-1.788v-1.33h5.451zm7.991 2.377v1.33h-1.33v-1.33h1.33zm4.604 0.697v1.33h-3.274v-1.33h3.274zM8.9 22.159v1.33H5.626v-1.33H8.9z"/>
        </svg>
      )
    }
  ];

  const toolsSkills = [
    { 
      name: 'VS Code', 
      color: 'blue-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#007ACC">
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
        </svg>
      )
    },
    { 
      name: 'GitHub', 
      color: 'gray-600',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#181717">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'Figma', 
      color: 'purple-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#F24E1E">
          <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.02-3.019-3.02h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.354-3.019 3.019s1.354 3.019 3.019 3.019h3.117v-6.038H8.148z"/>
          <path d="M8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019c1.665 0 3.019-1.355 3.019-3.019v-3.019H8.148z"/>
          <circle cx="15.852" cy="12.49" r="4.49" fill="#1ABCFE"/>
          <circle cx="15.852" cy="12.49" r="3.019" fill="#0ACF83"/>
        </svg>
      )
    },
    { 
      name: 'Postman', 
      color: 'orange-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FF6C37">
          <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 0 .211.073l.19-.190-.487-.487v-.517zm1.839-1.677c-.287.287-.19.618.3.618.49 0 .787-.331.5-.618-.287-.287-.513-.287-.8 0z"/>
        </svg>
      )
    },
    { 
      name: 'Docker', 
      color: 'blue-400',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#2496ED">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/>
        </svg>
      )
    },
    { 
      name: 'MongoDB', 
      color: 'green-500',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#47A248">
          <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
        </svg>
      )
    },
    { 
      name: 'Firebase', 
      color: 'yellow-600',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#FFCA28">
          <path d="M5.016 20.5l.474-8.045L3.36 6.03c-.15-.29.12-.64.45-.58l1.44.26L9.26 1.63c.11-.17.32-.17.43 0l4.01 4.08 1.44-.26c.33-.06.6.29.45.58l-2.13 6.425.474 8.045L12 22.5l-6.984-2z"/>
          <path d="M9.26 1.63L5.25 5.71l.474 8.045L12 22.5l6.984-2-.474-8.045L14.49 5.71 9.26 1.63z" fill="#FFA000"/>
        </svg>
      )
    },
    { 
      name: 'Netlify', 
      color: 'teal-400',
      logo: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#00C7B7">
          <path d="M16.934 8.519a1.044 1.044 0 0 1 .303-.23l2.349-1.045-2.192-2.171-.648 1.352a1.044 1.044 0 0 1-.416.34l-1.555.703 2.159 1.051zm-5.302 7.861a1.044 1.044 0 0 1-.443-.313l-1.085-2.415-1.84.828 2.205 2.154.703-1.552a1.044 1.044 0 0 1 .46-.702zM7.616 15.663l1.951-.877a1.044 1.044 0 0 1 .41-.086l2.624.02-1.455-3.239-2.169 1.02a1.044 1.044 0 0 1-.682.04l-2.514-.587 2.835 3.709zm8.428-7.904a1.044 1.044 0 0 1-.353.297l-1.548.939 1.464 3.252 2.148-1.002a1.044 1.044 0 0 1 .678-.044l2.53.589-2.919-3.031zM11.8 20.17a1.044 1.044 0 0 1-.526-.114l-2.353-1.06 2.174 2.19.705-1.016zm-.674-14.284a1.044 1.044 0 0 1 .526.114l2.353 1.06L11.831 4.87l-.705 1.016zm8.294 4.927l-2.704-.632a1.044 1.044 0 0 0-.806.052l-1.736.809 1.292 2.87 3.954-3.099zm-15.916.052l2.704.632a1.044 1.044 0 0 0 .806-.052l1.736-.809-1.292-2.87L3.504 10.865z"/>
        </svg>
      )
    }
  ];

  // Define theme colors for each tab
  const getThemeConfig = (tab: string) => {
    switch (tab) {
      case 'frontend':
        return {
          skills: frontendSkills,
          title: 'Frontend Development',
          primaryColor: 'blue-500',
          secondaryColor: 'indigo-500',
          bgGradient: 'from-blue-900/20 to-indigo-900/20',
          borderColor: 'blue-500/30',
          shadowColor: '0_0_30px_rgba(59,130,246,0.4)',
          textColor: 'blue-400',
          icon: (
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          )
        };
      case 'data':
        return {
          skills: dataSkills,
          title: 'Data Analysis',
          primaryColor: 'green-500',
          secondaryColor: 'emerald-500',
          bgGradient: 'from-green-900/20 to-emerald-900/20',
          borderColor: 'green-500/30',
          shadowColor: '0_0_30px_rgba(34,197,94,0.4)',
          textColor: 'green-400',
          icon: (
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )
        };
      case 'tools':
        return {
          skills: toolsSkills,
          title: 'Tools & Others',
          primaryColor: 'purple-500',
          secondaryColor: 'pink-500',
          bgGradient: 'from-purple-900/20 to-pink-900/20',
          borderColor: 'purple-500/30',
          shadowColor: '0_0_30px_rgba(168,85,247,0.4)',
          textColor: 'purple-400',
          icon: (
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        };
      default:
        return getThemeConfig('frontend');
    }
  };

  const currentTheme = getThemeConfig(activeTab);

  return (
    <>
      {/* Enhanced Toggle Switch */}
      <motion.div
        className="flex justify-center mb-12 gap-2 sm:gap-4 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Frontend Tab */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Glowing Border Effect */}
          <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
            activeTab === 'frontend'
              ? 'bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 p-[2px] shadow-lg shadow-blue-500/60 md:shadow-blue-500/40 shadow-2xl'
              : 'bg-gray-700/50 md:bg-gray-700/30 p-[1px] md:hover:bg-gray-600/50'
          }`}>
            <div className="w-full h-full bg-gray-800/80 rounded-2xl backdrop-blur-md"></div>
          </div>
          
          {/* Frontend Button */}
          <motion.button
            className={`relative z-10 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'frontend'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('frontend')}
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="hidden sm:inline">Frontend</span>
            <span className="sm:hidden">Front</span>
          </motion.button>
        </motion.div>

        {/* Data Analysis Tab */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Glowing Border Effect */}
          <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
            activeTab === 'data'
              ? 'bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 p-[2px] shadow-lg shadow-green-500/60 md:shadow-green-500/40 shadow-2xl'
              : 'bg-gray-700/50 md:bg-gray-700/30 p-[1px] md:hover:bg-gray-600/50'
          }`}>
            <div className="w-full h-full bg-gray-800/80 rounded-2xl backdrop-blur-md"></div>
          </div>
          
          {/* Data Analysis Button */}
          <motion.button
            className={`relative z-10 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'data'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('data')}
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="hidden sm:inline">Data Analysis</span>
            <span className="sm:hidden">Data</span>
          </motion.button>
        </motion.div>

        {/* Tools Tab */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {/* Glowing Border Effect */}
          <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
            activeTab === 'tools'
              ? 'bg-gradient-to-r from-purple-400 via-purple-500 to-pink-600 p-[2px] shadow-lg shadow-purple-500/60 md:shadow-purple-500/40 shadow-2xl'
              : 'bg-gray-700/50 md:bg-gray-700/30 p-[1px] md:hover:bg-gray-600/50'
          }`}>
            <div className="w-full h-full bg-gray-800/80 rounded-2xl backdrop-blur-md"></div>
          </div>
          
          {/* Tools Button */}
          <motion.button
            className={`relative z-10 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === 'tools'
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('tools')}
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Tools
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Dynamic Skills Grid with Theme Colors */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`bg-gradient-to-br ${currentTheme.bgGradient} backdrop-blur-md rounded-3xl p-8 border border-${currentTheme.borderColor} shadow-xl hover:shadow-[${currentTheme.shadowColor}] transition-all duration-300`}>
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-10 h-10 rounded-lg bg-${currentTheme.primaryColor}/20 flex items-center justify-center`}>
                {currentTheme.icon}
              </div>
              <h3 className={`text-2xl font-bold text-${currentTheme.textColor}`}>{currentTheme.title}</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentTheme.skills.map((skill, index) => {
                const skillColor = skill.color || currentTheme.primaryColor;
                return (
                  <motion.div
                    key={skill.name}
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: 5
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Individual skill color glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-${skillColor}/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`}></div>
                    
                    {/* Main card with individual skill colors */}
                    <div className={`relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 group-hover:border-${skillColor}/60 group-hover:shadow-2xl group-hover:shadow-${skillColor}/30 transition-all duration-500 text-center h-full overflow-hidden`}>
                      
                      {/* Animated background gradient with skill color */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-${skillColor}/5 via-transparent to-${skillColor}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-${skillColor}/40 transition-all duration-500`}>
                          <div className="group-hover:scale-110 transition-transform duration-300">
                            {skill.logo}
                          </div>
                        </div>
                        <h4 className={`text-white font-semibold text-sm group-hover:text-${skillColor} transition-all duration-300 group-hover:font-bold`}>
                          {skill.name}
                        </h4>
                      </div>
                      
                      {/* Floating particles effect with skill color */}
                      <div className={`absolute top-2 right-2 w-1 h-1 bg-${skillColor}/50 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500`}></div>
                      <div className={`absolute bottom-3 left-3 w-1 h-1 bg-${skillColor}/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-700`}></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SkillsSection;