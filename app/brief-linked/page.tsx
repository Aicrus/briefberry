import { redirect } from "next/navigation";

export default function Page() {
    redirect("/brief?feature=proposal&view=1");
}
