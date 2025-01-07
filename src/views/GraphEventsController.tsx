// import { useRegisterEvents, useSigma } from "@react-sigma/core";
import { useRegisterEvents } from "@react-sigma/core";
import { FC, PropsWithChildren, useEffect } from "react";

// function getMouseLayer() {
//   return document.querySelector(".sigma-mouse");
// }

const GraphEventsController: FC<PropsWithChildren<{ setHoveredNode: (node: string | null) => void }>> = ({
  setHoveredNode,
  children,
}) => {
  // const sigma = useSigma();
  // const graph = sigma.getGraph();
  const registerEvents = useRegisterEvents();

  /**
   * Initialize here settings that require to know the graph and/or the sigma
   * instance:
   */
  useEffect(() => {
    registerEvents({
      clickNode(target) {
        const { node } = target
        console.log("clickNode", target, node); 
        setHoveredNode(node);
        // if (!graph.getNodeAttribute(node, "hidden")) {
        //   window.open(graph.getNodeAttribute(node, "URL"), "_blank");
        // }
      },
      clickStage(target) {
        console.log("clickStage", target);
        setHoveredNode(null);
      },
      // enterNode({ node }) {
      //   setHoveredNode(node);
      //   // TODO: Find a better way to get the DOM mouse layer:
      //   const mouseLayer = getMouseLayer();
      //   if (mouseLayer) mouseLayer.classList.add("mouse-pointer");
      // },
      // leaveNode() {
      //   setHoveredNode(null);
      //   // TODO: Find a better way to get the DOM mouse layer:
      //   const mouseLayer = getMouseLayer();
      //   if (mouseLayer) mouseLayer.classList.remove("mouse-pointer");
      // },
    });
  }, []);

  return <>{children}</>;
};

export default GraphEventsController;
