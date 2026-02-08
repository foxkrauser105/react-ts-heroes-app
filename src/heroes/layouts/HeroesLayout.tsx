import { Outlet } from "react-router"
import { HeroesProvider } from "../provider/HeroesProvider"
import { CustomMenu } from "@/components/custom/CustomMenu"

export const HeroesLayout = () => {
  return (
    <HeroesProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto p-6">
            <CustomMenu />
            <br />
            <Outlet/>
        </div>
      </div>
    </HeroesProvider>
  )
}

export default HeroesLayout;