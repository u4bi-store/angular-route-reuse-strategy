import {RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle} from "@angular/router";


/*
    load

    1. shouldReuseRoute
    2. retrive
    3. shouldAttachs

    change

    1. shouldReuseRoute
    2. retrive
    3. shouldDetach
    4. store
    5. shouldAttach 
    
*/
export class CustomReuseStrategy implements RouteReuseStrategy {

    handlers: {[key: string]: DetachedRouteHandle} = {};

    //route 를 재사용할것인가. 어디서 어디로 옮길것인지 스냅샷이 넘어온다.
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        console.log('shouldReuseRoute ',curr, future);
        return future.routeConfig === curr.routeConfig;
    }

    //Detach 될때 상태를 저장할건지 아닌지 리턴해준다.
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log('shouldDetach', route);
        return true; // 저장 true 저장안함 false
    }

    //위에서 저장하기로 한 스냅샷을 저장해둔다.
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        console.log('store', route, handle);
        
        this.handlers[route.routeConfig.path] = handle;
        console.log('handlers', this.handlers);
    }

    //저장해둔 Snapshot에 Attach 할 때의 대리 콜백
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.log('shouldAttach', route);
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        console.log('retrieve', route);
        if (!route.routeConfig) return null;
        return this.handlers[route.routeConfig.path];
    }

    //routeSnapShot 에서 URL 을 계산해서 리턴해준다.
    getURL(route: ActivatedRouteSnapshot) {
        let next = route;
        let url = "";
        while(next) {
            if (next.url) {
                url = next.url.join('/');
            }
            next = next.firstChild;
        }
        url = "/" + url;
        return url;
    }

}