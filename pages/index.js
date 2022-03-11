import { resolvers } from "./api/graphql";
import { useState } from "react/cjs/react.development";
import Players from "../components/players";
import AddPlayer from "../components/addPlayer";

export default function Home({ players }) {
  const [activeTab, setActiveTab] = useState("Jugadores");

  const tabs = ["Agregar jugador", "Jugadores", "Editar Jugador"];

  return (
    <div>
      <div className="tabs w-screen">
        {tabs.map((tab) => (
          <a
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab tab-lg tab-bordered w-1/3 ${
              activeTab === tab ? "tab-active" : ""
            }`}
          >
            {tab}
          </a>
        ))}
      </div>
      {activeTab === "Agregar jugador" && <AddPlayer />}
      {activeTab === "Jugadores" && (
        <div>
          <Players players={players} />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const players = await resolvers.Query.players();

  return {
    props: {
      players,
    },
  };
}
