import { ConnectGithub } from "@/components/github/ConnectGithub"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConnectGithubPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
            <CardHeader>
            <CardTitle>Connect GitHub</CardTitle>
            <CardDescription>
                Connect your GitHub account to enable repository access and enhanced features
            </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
            <ConnectGithub />
            </CardContent>
        </Card>
        </div>
    )
}