import Image from "next/image"
import moment from "moment"
import shallow from "zustand/shallow"
import { useStore } from "../constants/code"
import { useRouter } from "next/navigation"

export default function JobCard(props) {
  const { data, org } = props
  const [param1, updateParam1] = useStore(
    state => [state.param1, state.updateParam1],
    shallow
  )
  const router = useRouter()

  function viewJob(refid) {
    refid = refid.toUpperCase()
    updateParam1(refid)
    if (org) {
      router.push(`/marketplace/organisation/job/preview/${refid}`)
    } else {
      router.push(`/marketplace/job-detail/${refid}`)
    }
  }
  return (
    <>
      <div className="bg-[#f4f4f4] p-5 border border-2 border-slate-300 rounded-[25px] h-full">
        <div className="flex mb-8">
          <div className="bg-white rounded-full p-2.5 flex items-center justify-center w-[50px] h-[50px]">
            {data.org.profile && (
              <Image
                src={`${data.org.profile}`}
                width={300}
                height={300}
                alt="Google"
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </div>
          <div className="pl-3 w-[calc(100%-60px)]">
            <h3 className="font-bold text-md mb-1 line_clamp_1">
              {data.title}
            </h3>
            <h5 className="font-medium text-sm">{data.user.company_name}</h5>
          </div>
        </div>
        <div className="text-[#787878] text-[12px] flex flex-wrap border-b border-slate-300">
          <p className="w-full sm:max-w-[50%] mb-3">
            Place: {data.location ? data.location : <>Not Specified</>}
          </p>
          <p className="w-full sm:max-w-[50%] mb-3 sm:text-right">
            {data.exp ? data.exp : <>Not Specified</>}
          </p>
          <p className="w-full sm:max-w-[50%] mb-3">
            {data.type ? data.type : <>Not Specified</>}
          </p>
          <p className="w-full sm:max-w-[50%] mb-3 sm:text-right">
            {data.salary ? (
              <>
                {data.curr} {data.salary}
              </>
            ) : (
              <>Not Specified</>
            )}
          </p>
        </div>
        <div className="flex items-center justify-between pt-4 text-[12px]">
          <p>{moment(data.timestamp).fromNow()}</p>
          <button
            type="button"
            onClick={e => viewJob(data.refid)}
            className="text-[#6D27F9] hover:underline hover:text-black"
          >
            View Job
          </button>
        </div>
      </div>
    </>
  )
}
