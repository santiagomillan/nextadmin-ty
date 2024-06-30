export const authConfig = {
    pages: {
        signIn: "/login"
    },
    callbacks:{
        authorized({auth,request}){
            const isLoggedIn = auth?.user
            const isOnDashboard = request.nextURL.pathname.startsWith("/dashboard")
            if(isOnDashboard){
                if (isLoggedIn) return true
                return false
            }else if(isLoggedIn){
                return Response.redirect(new URL("/dashboard", request.nextURL))
            }
            return true
        }
    }
}