import React from "react";
import { ReactNode } from "react";
import { createUseStyles } from "react-jss";
import { Navigation } from "../../components/Navigation/Navigation";


interface ILayoutProps {
  content: ReactNode;
}
export const Layout = (props: ILayoutProps) => {
  const layoutStyles = LayoutStyles();
  return (
    <div className={layoutStyles.layoutContainer}>
      <Navigation />
      <div className={layoutStyles.content}>{props.content}</div>
    </div>
  );
};
const LayoutStyles = createUseStyles({
  layoutContainer: {},
  content: {

  },
});
