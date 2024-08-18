import { GiShirtButton } from "react-icons/gi";

const Loading = () => {
    return (<div className="flex flex-col gap-1 items-center text-slate-200">
        <div className="flex gap-1 text-4xl">
            <GiShirtButton className="text-slate-200 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <GiShirtButton className="text-slate-200 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <GiShirtButton className="text-slate-200 rounded-full animate-bounce" />
        </div>
        {/*<h1 className="text-3xl"><b>LOADING</b></h1>*/}
    </div>)
}

export default Loading;