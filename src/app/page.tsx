import Content from '@/components/Content/Content'
import SceneContainer from '@/components/Scene/SceneContainer'
export default function Home() {
  return (
    <div className="flex min-h-screen w-full  p-6 bg-white">
      <Content />
      <SceneContainer />
    </div>
  );
}
