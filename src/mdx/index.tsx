import React, { isValidElement } from "react";
import cx from "classnames";
import hydrate from "next-mdx-remote/hydrate";

import { Header } from "../components/Header";
import { Link } from "../components/Link";

import { Heading } from "./Heading";
import { Tabs, TabItem, TabsContext } from "./Tabs";
import { LiveCode, withCodeBlockTitle } from "./Code";

const components = {
  // HTML element overrides
  a: (props: React.HTMLProps<HTMLAnchorElement>) => <Link {...props} />,
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <Heading {...props} type="h1" />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <Heading {...props} type="h2" />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <Heading {...props} type="h3" />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <Heading {...props} type="h4" />
  ),
  h5: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <Heading {...props} type="h5" />
  ),
  h6: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <Heading {...props} type="h6" />
  ),
  pre: (props: React.HTMLProps<HTMLPreElement>) => {
    const pre = (className?: string) => (
      <pre {...props} className={cx(props.className, className)} />
    );

    if (isValidElement(props.children) && props.children?.props?.live) {
      return <LiveCode code={props.children?.props?.children ?? ""} />;
    }

    if (isValidElement(props.children) && props.children?.props?.title) {
      return withCodeBlockTitle(
        props.children?.props?.title,
        pre("code-block-title")
      );
    }

    return pre();
  },

  // Custom MDX components
  Header,
  Tabs,
  TabItem,
};

export default components;

export function Hydrate({ source }: { source: any }) {
  return <TabsContext>{hydrate(source, { components })}</TabsContext>;
}
