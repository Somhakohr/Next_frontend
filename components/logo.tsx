import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../public/images/logo.png';

export default function logo(props) {
    const {userType} = props;
    return (
        <>
            <div className="w-full max-w-[170px] xl:max-w-[200px]">
                { userType.length > 0 ? 
                    <>
                    { userType == 'Candidate' &&
                        <Link href="/candidate" className="w-full inline-block align-middle">
                            <Image src={logoImg} alt="Somhako" />
                        </Link>
                    } 
                    { userType == 'Organisation' &&
                        <Link href="/organisation" className="w-full inline-block align-middle">
                            <Image src={logoImg} alt="Somhako" />
                        </Link>
                    }
                    </>
                :
                    <Link href="/" className="w-full inline-block align-middle">
                        <Image src={logoImg} alt="Somhako" />
                    </Link>
                }
            </div>
        </>
    )
}