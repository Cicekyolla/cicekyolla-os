import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <div style={{ overflowX: "hidden", maxWidth: "100vw", position: "relative" }}>
      <RouterProvider router={router} />
    </div>
  );
}