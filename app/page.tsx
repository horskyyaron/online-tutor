import socket from "./lib/socket";

export default function Home() {
    socket.connect()

    return (
        <div className="flex items-center justify-center mt-5">
            <ul id="messages"></ul>
            <form id="form" action="" className="">
                <input
                    id="input"
                    className="rounded-xl border-black border-2 mr-3 text-sm p-2"
                />
                <button className="">Send</button>
            </form>
        </div>
    );
}
