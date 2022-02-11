import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const DefaultLayout = lazy(() => import("./components/Layout/Default"));
const Home = lazy(() => import("./view/Home"));

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <Suspense fallback={<div>Loading ...</div>}>
            <DefaultLayout />
          </Suspense>
        } >

          <Route index element={
            <Suspense fallback={<div>Loading ...</div>}>
              <Home />
            </Suspense>
          } />

        </Route>
      </Routes>
    </>
  );
}

export default App;
