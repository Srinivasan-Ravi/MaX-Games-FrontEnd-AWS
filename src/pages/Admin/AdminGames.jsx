import AdminNav from "./Layout/AdminLeftbar";
import { useEffect, useState } from "react";
import { Gamesx, GameDelete } from "../../services/api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Settings, XCircle } from "lucide-react";

export default function AdminDashboard() {
    const [gamesx, setGamesx] = useState([]);
    useEffect(() => {
        loadGames();
    }, []);
    const loadGames = () => {
        Gamesx().then((res) => {
            setGamesx(res.data);
        });
    };
    const handleDeleteGame = (gameId, gameName) => {

        let ct = "Are you want to delete " + gameName + " ?";
        if (confirm(ct)) {
            const toaster = toast.loading("Deleting Game ...", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                isLoading: false
            })
            GameDelete(gameId)
                .then(() => {
                    loadGames();
                    toast.update(toaster, { render: "Game Deleted !", type: "success", isLoading: false });
                })
                .catch((error) => {
                    toast.update(toaster, { render: "Failed to delete the Game !", type: "error", isLoading: false });
                });
        }
    };

    return (
        <div className='game-x-main'>
            <AdminNav />
            <div className='game-actions'>
                <h1 className="game-page-title">Games</h1>
                <div className='game-x-data'>
                    <div>
                        <div className="tbl-header">
                            <table cellPadding={0} cellSpacing={0} border={0}>
                                <thead>
                                    <tr>
                                        <th>Game Name</th>
                                        <th>Developer</th>
                                        <th>Publisher</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="tbl-content">
                            <table cellPadding={0} cellSpacing={0} border={0}>
                                <tbody>
                                    {Array.isArray(gamesx) && gamesx.length > 0 ? (
                                        gamesx.map((game) => (
                                            <tr key={game.id}>
                                                <td>{game.gamename}</td>
                                                <td>{game.auth.username}</td>
                                                <td>{game.gamedeveloper}</td>
                                                <td>
                                                    <Link to={`/Admin/games/edit/${game.id}`}>
                                                        <button className="game-x-edit-btn">
                                                            <span><Settings size={28} /></span>
                                                        </button>
                                                    </Link>
                                                    <button
                                                        className="game-x-delete-btn"
                                                        onClick={() => handleDeleteGame(game.id, game.gamename)}>
                                                        <span><XCircle size={28} /></span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6}>
                                                <div className='sub-loader-x no-size-loader'>
                                                    <div className="loader-max">
                                                        <span className="load-max"></span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}