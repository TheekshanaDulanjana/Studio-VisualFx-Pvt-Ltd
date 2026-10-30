// Central GSAP setup - import gsap / plugins from here so they are
// registered exactly once for the whole app.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Same "luxury" feel as the old framer-motion curve [0.16, 1, 0.3, 1]
export const EASE = "expo.out";

gsap.defaults({ ease: EASE });

export { gsap, ScrollTrigger, SplitText, useGSAP };
