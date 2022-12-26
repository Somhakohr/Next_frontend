import moment from "moment"

export default function Notifications(props) {
    const {read,unread,readfn}=props
    return (
        <>
        <div className="bg-white max-h-[200px] overflow-y-auto">
            {unread.length > 0 && unread.map((data, i) => (
                <div className="flex items-center justify-between py-3 px-2 border-b border-slate-300 last:border-b-0" key={i}>
                    <div className="w-[70%]">
                        <div className="flex items-center">
                            <span className="block w-[10px] h-[10px] rounded-full bg-[#6D27F9] mr-2"></span>
                            <p className="w-[calc(100%-10px)] text-[12px] text-left line_clamp_2">
                            {data.fields.verb}
                            </p>
                        </div>
                    </div>
                    <small className="w-[30%] text-right text-[10px] text-gray-500">{moment(data.fields.timestamp).fromNow()}</small>
                </div>
            ))}
            {read.length>0 && read.map((data, i) => (
                <div className="flex items-center justify-between py-3 px-2 border-b border-slate-300 last:border-b-0" key={i}>
                    <div className="w-[70%]">
                        <div className="flex items-center">
                            <span className="block w-[10px] h-[10px] rounded-full bg-gray-400 mr-2"></span>
                            <p className="w-[calc(100%-10px)] text-[12px] text-left line_clamp_2">
                            {data.fields.verb}
                            </p>
                        </div>
                    </div>
                    <small className="w-[30%] text-right text-[10px] text-gray-500">{moment(data.fields.timestamp).fromNow()}</small>
                </div>
            ))}
            {read.length <= 0 && unread.length <=0 && 
            <>
            <div className="flex items-center justify-between py-3 px-2 border-b border-slate-300 last:border-b-0">
                    <div className="w-[100%]">
                        <div className="flex items-center">
                            <p className="w-full text-[12px] text-center line_clamp_2">
                            No Notification
                            </p>
                        </div>
                    </div>
                </div>
            </>}
            {/* <div className="flex items-center justify-between py-3 px-2 border-b border-slate-300 last:border-b-0">
                <div className="w-[70%]">
                    <div className="flex items-center">
                        <span className="block w-[10px] h-[10px] rounded-full bg-[#6D27F9] mr-2"></span>
                        <p className="w-[calc(100%-10px)] text-[12px] text-left line_clamp_2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        </p>
                    </div>
                </div>
                <small className="w-[30%] text-right text-[10px] text-gray-500">45 min ago</small>
            </div>
            <div className="flex items-center justify-between py-3 px-2 border-b border-slate-300 last:border-b-0">
                <div className="w-[70%]">
                    <div className="flex items-center">
                        <span className="block w-[10px] h-[10px] rounded-full bg-[#6D27F9] mr-2"></span>
                        <p className="w-[calc(100%-10px)] text-[12px] text-left line_clamp_2">
                        Welcome to somhako
                        </p>
                    </div>
                </div>
                <small className="w-[30%] text-right text-[10px] text-gray-500">1 sec ago</small>
            </div>
            <div className="flex items-center justify-between py-3 px-2 border-b border-slate-300 last:border-b-0">
                <div className="w-[70%]">
                    <div className="flex items-center">
                        <span className="block w-[10px] h-[10px] rounded-full bg-gray-400 mr-2"></span>
                        <p className="w-[calc(100%-10px)] text-[12px] text-left line_clamp_2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        </p>
                    </div>
                </div>
                <small className="w-[30%] text-right text-[10px] text-gray-500">45 min ago</small>
            </div> */}
        </div>
        </>
    )
}