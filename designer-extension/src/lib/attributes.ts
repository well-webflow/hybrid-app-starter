import { Breakpoints, websiteBreakpoints } from "../types/waterfall-types.d";

/**
 * Prefixes a breakpoint to an attribute
 * @param attrName The attribute as a string
 * @param device The breakpoint
 * @returns A combined string with the breakpoint and attribute
 */
export function getBreakpointAttr(attrName: string, device: string) {
  let name = device + "-" + attrName;
  return name;
}

/**
 * Parses an attribute to split the breakpoint from the base attribute
 * @param attrName The attribute as a string
 * @returns This attribute's breakpoint, or null
 */
export function getBaseAttr(attrName: string): {
  breakpoint: string | null;
  baseAttr: string;
} {
  const [firstWord, ...rest] = attrName.split("-");
  // check if the first word is a breakpoint
  const isBreakpoint = websiteBreakpoints.includes(firstWord as Breakpoints);
  // create the base attr (without the breakpoint)
  const baseAttr = isBreakpoint ? rest.join("-") : attrName;
  // get the breakpoint, or null
  const breakpoint = isBreakpoint ? firstWord : null;
  return { breakpoint, baseAttr };
}
