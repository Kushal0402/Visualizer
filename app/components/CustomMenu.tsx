import { Menu } from "@headlessui/react";
import Image from "next/image";

type props = {
  title: string;
  state: string;
  filters: Array<string>;
  setState: (value: string) => void;
};

const CustomMenu = ({ title, state, filters, setState }: props) => {
  return (
    <div className="flexStart flex-col w-full gap-8 relative">
      <label className="w-full text-black/80 " htmlFor={title}>
        {title}
      </label>
      <Menu as="div" className="self-start relative">
        <div>
          <Menu.Button className="flexCenter custom_menu-btn">
            {state || "select a category"}
            <Image
              src="/arrow-down.svg"
              width={10}
              height={5}
              alt="Arrow-down"
            />
          </Menu.Button>
        </div>

        <Menu.Items className="flexStart custom_menu-items">
          {filters.map((tag) => (
            <Menu.Item key={tag}>
              <button
                type="button"
                value={tag}
                className="custom_menu-item"
                onClick={(e) => setState(e.currentTarget.value)}
              >
                {tag}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CustomMenu;
