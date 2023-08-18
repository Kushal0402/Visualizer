import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

type ColumnProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: ColumnProps) => {
  return (
    <div className="footer_column">
      <h4 className="font-semibold text-lg">{title}</h4>
      <ul className="flex flex-col gap-2 font-medium">
        {links.map((link) => (
          <Link href="/" key={link} className="hover:underline">
            {link}
          </Link>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full border-b-2 border-slate-300 pb-14">
        <div className="flex items-start flex-col">
          <Image
            src="/Visualizer.png"
            width={135}
            height={63}
            alt="Visualizer"
          />
        </div>

        <div className="flex flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />

          <div className="flex-1 flex flex-col gap-4">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>

          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />

          <div className="flex-1 flex flex-col gap-4">
            <FooterColumn
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterColumn
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>

          <FooterColumn
              title={footerLinks[6].title}
              links={footerLinks[6].links}
            />
        </div>
      </div>

      <div className="flexBetween footer_copyright">
        <p>Made By Kushal Sharma. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
