import Link from 'next/link'

export default function Header() {
    return (
        <header>
            <Link href={`/`}>
                SUPER TO-DO LIST MAKER
            </Link>
        </header>
    )

}