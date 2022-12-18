export default function Whitepaper() {
    return (
        <main className="py-8">
            <div className="container">
                <div className="w-full max-w-[1000px] mx-auto bg-white shadow-normal border border-teal-400 rounded-[25px] p-8">
                    <h1 className="font-bold text-center text-2xl mb-6">
                        Whitepaper
                    </h1>
                    <div className="max-w-[320px] md:max-w-[360px] mx-auto relative overflow-hidden text-center">
                        <iframe src="https://www.canva.com/design/DAFNJ1GIOKo/view?embed" className="h-[450px] md:h-[510px] w-full mb-4" allow="fullscreen">
                        </iframe>
                        <a href="https://www.canva.com/design/DAFNJ1GIOKo/view" target="_blank" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188] inline-block">Open it in new tab</a>
                    </div>
                </div>
            </div>
        </main>
    )
}