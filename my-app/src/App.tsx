import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const DefaultLayout = lazy(() => import("./components/Layout/Default"));
const Home = lazy(() => import("./view/Home"));
const Photo = lazy(() => import("./view/Photo"));
const Users = lazy(() => import("./view/Users"));
const HotelHome = lazy(() => import("./view/Hotel/Home"));
const HotelCreate = lazy(() => import("./view/Hotel/Create"));
const HotelUpdate = lazy(() => import("./view/Hotel/Update"));

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={
					<Suspense fallback={<div>Loading ...</div>}>
						<DefaultLayout />
					</Suspense>
				} >

					<Route path='/' element={
						<Suspense fallback={<div>Loading ...</div>}>
							<Home />
						</Suspense>
					} />

					<Route path='/users' element={
						<Suspense fallback={<div>Loading ...</div>}>
							<Users />
						</Suspense>
					} />

					<Route path='/photo' element={
						<Suspense fallback={<div>Loading ...</div>}>
							<Photo />
						</Suspense>
					} />

					<Route path='/hotel' element={
						<Suspense fallback={<div>Loading ...</div>}>
							<HotelHome />
						</Suspense>
					} />

					<Route path='/hotel/create' element={
						<Suspense fallback={<div>Loading ...</div>}>
							<HotelCreate />
						</Suspense>
					} />

					<Route path='/hotel/update' element={
						<Suspense fallback={<div>Loading ...</div>}>
							<HotelUpdate />
						</Suspense>
					} />

				</Route>
			</Routes>
		</>
	);
}

export default App;
