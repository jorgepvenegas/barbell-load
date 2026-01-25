import { type JSX, type Component } from "solid-js";
import { TabBar } from "./TabBar";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: Component<LayoutProps> = (props) => {
  return (
    <div class="container mx-auto max-w-full sm:max-w-2xl min-h-screen bg-page">
      <main class="mx-6 pt-0 pb-[100px] flex flex-col gap-8">
        {props.children}
      </main>
      <div class="fixed bottom-0 left-0 right-0 px-6 py-3 pointer-events-none glass border-0">
        <div class="container mx-auto max-w-full sm:max-w-2xl pointer-events-auto">
          <TabBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
