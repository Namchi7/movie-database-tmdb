import Image from "next/image";
import Link from "next/link";

import { navLinkData } from "@/constants/navLinkData";
import logo_big from "@/assets/images/mdb-logo-big.png";
import tmdb_logo from "@/assets/svg/tmdb_logo_attribution.svg";

const Footer: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#032541] bg-footer-gradient">
      <div className="w-full max-w-[1200px] flex justify-center items-center gap-24 flex-nowrap p-4 py-16">
        <Link href={"/"}>
          <Image
            src={logo_big}
            alt="Movie Database"
            height={64}
            width={183}
            className="w-[183] h-[64px]"
          />
        </Link>

        <nav className="flex justify-start items-start gap-12">
          {navLinkData.map((navData, i: number) => (
            <div className="grid gap-2" key={i}>
              <div className="text-white text-[1rem] font-semibold tracking-wide">
                {navData.title}
              </div>
              <ul className="grid gap-1">
                {navData.links.map((nav, ind: number) => (
                  <li key={ind}>
                    <Link
                      href={nav.link_path}
                      className="text-white text-[0.9rem] "
                    >
                      {nav.link_text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="grid gap-2">
            <div className="text-white text-[1rem] font-semibold tracking-wide">
              Reference
            </div>
            <ul className="grid gap-1">
              <li>
                <Link
                  href={"https://www.themoviedb.org"}
                  rel="no-referrer no-opener"
                  target="_blank"
                  className="text-white text-[0.9rem] "
                >
                  TMDB
                </Link>
              </li>
              <li>
                <Link
                  href={"https://developer.themoviedb.org/docs/getting-started"}
                  rel="no-referrer no-opener"
                  target="_blank"
                  className="text-white text-[0.9rem] "
                >
                  TMDB API
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="w-full max-w-[75rem] flex flex-col justify-center items-center gap-6 p-4 py-12">
        <Link
          href={"https://www.themoviedb.org"}
          rel="no-referrer no-opener"
          target="_blank"
          className="w-full flex justify-center items-center"
        >
          <Image
            src={tmdb_logo}
            alt="TMDB LOGO ATTRIBUTION"
            className="w-[31.25rem] max-w-full "
          />
        </Link>

        <p className="text-[0.9rem] text-white/70 font-medium text-center">{`This [website, program, service, application, product] uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.`}</p>
      </div>
    </div>
  );
};

export default Footer;
