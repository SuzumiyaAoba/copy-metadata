import { animated, useSpringValue, type SpringProps } from "@react-spring/web";
import cssText from "data-text:~style.css";
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "use-click-outside";

import { sendToBackground } from "@plasmohq/messaging";
import { useMessage } from "@plasmohq/messaging/hook";

import { useConfig, useDebounce } from "~libs/hooks";
import { createEnvFromDocument, evalTemplate, type Env } from "~libs/template";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
};

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.body;

const DELAY = 2000;

function IndexPopup() {
  const [config] = useConfig();

  const springOpacity = useSpringValue(0);
  const [copyText, setCopyText] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const debounceVisible = useDebounce(isVisible, (value) => !value, DELAY);
  const [currentEnv, setCurrentEnv] = useState<Env>({
    title: "",
    url: ""
  });
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const writeTextToClipboard = (text: string, props?: { delay?: number }) => {
    navigator.clipboard.writeText(text);

    setCopyButtonText("Copied!");

    toggleVisible(false, props);
  };

  const handleOnCopyClick = () => {
    writeTextToClipboard(copyText, { delay: DELAY });
  };

  const openOptions = async () => {
    await sendToBackground({ name: "openOptions" });
  };

  const handleInnerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const toggleVisible = (visible?: boolean, props?: SpringProps) => {
    const next = visible === undefined ? !isVisible : visible;

    if (next) {
      setCopyButtonText("Copy");
    }

    if (next) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, props?.delay as number);
    }

    springOpacity.start(next ? 1 : 0, props);
  };

  const ref = useRef();
  useClickOutside(
    ref,
    () => {
      toggleVisible(false);
    },
    "click"
  );

  useMessage<string, undefined>((req, res) => {
    if (req.name === "popup") {
      toggleVisible();
    }
  });

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const env = createEnvFromDocument(document);
    setCurrentEnv(env);

    const {
      copyOnIconClick,
      enabledTemplate: { template }
    } = config;

    setCopyText(evalTemplate(template, env));

    if (copyOnIconClick) {
      const text = evalTemplate(template, env);

      writeTextToClipboard(text, { delay: DELAY });
    }
  }, [isVisible]);

  return (
    <animated.div
      ref={ref}
      className="px-4 py-4 w-96 
               bg-neutral-50 
                 drop-shadow-xl 
                 border rounded-xl 
                 overflow-hidden text-pretty
               text-black text-lg"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        display: debounceVisible ? "block" : "none",
        opacity: springOpacity
      }}
      onClick={handleInnerClick}>
      <button
        className="mb-2 px-1 py-2 w-full text-sm font-bold rounded-full bg-black text-white"
        onClick={handleOnCopyClick}>
        {copyButtonText}
      </button>
      <div className="flex flex-col gap-2 mt-4 text-sm">
        <div className="flex">
          <p className="mr-1">Title:</p>
          <p className="font-bold break-all">{currentEnv.title}</p>
        </div>
        <div className="flex">
          <p className="mr-1">URL:</p>
          <p className="font-bold break-all">{currentEnv.url}</p>
        </div>
      </div>
      <div className="flex mt-4 items-center">
        <div className="px-2 py-3 rounded-lg text-sm font-semibold bg-gray-200 text-nowrap overflow-x-scroll">
          {copyText}
        </div>
        <div className="h-full ml-2 my-auto text-2xl">
          <button onClick={openOptions}>
            <span className="i-vscode-icons-file-type-light-config"></span>
          </button>
        </div>
      </div>
    </animated.div>
  );
}

export default IndexPopup;
