import Link from 'next/link';

export default function logo(props) {
    const {userType} = props;
    return (
        <>
            <div className="w-full max-w-[170px] xl:max-w-[200px]">
                { userType.length > 0 ? 
                    <>
                    { userType == 'Candidate' &&
                        <Link href="/candidate" className="w-full inline-block align-middle">
                            <img src="/images/logo.png" alt="Somhako" />
                        </Link>
                    } 
                    { userType == 'Organisation' &&
                        <Link href="/organisation" className="w-full inline-block align-middle">
                            <img src="/images/logo.png" alt="Somhako" />
                        </Link>
                    }
                    </>
                :
                    <Link href="/" className="w-full inline-block align-middle">
                        <img src="/images/logo.png" alt="Somhako" />
                    </Link>
                }
            </div>
        </>
    )
}