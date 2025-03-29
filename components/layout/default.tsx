import DefaultNavbar from "./navbar"

interface Props {
    children?: React.ReactNode
}

export default function DefaultLayout({ children }: Props) {
    return (
        <div id="main-layout" className="w-full">
            <DefaultNavbar />
            <main id="main-content">
                {children}
            </main>
        </div>
    )
}

