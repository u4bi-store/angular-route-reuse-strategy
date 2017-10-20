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

    private url : any;

    constructor(){
        this.url = [
            // '/test',
            '/save'
        ];

    }

    // detach될때 상태를 저장할건지 아닌지 리턴
    shouldDetach = (route: ActivatedRouteSnapshot): boolean => this.url.indexOf(this.getURL(route)) > -1 ? true : false;


    shouldAttach = (route: ActivatedRouteSnapshot): boolean => !!route.routeConfig && !!this.handlers[this.getURL(route)]; // 저장해둔 snapshot에 attach 할 때의 대리 콜백
    shouldReuseRoute = (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean => future.routeConfig === curr.routeConfig; // route 를 재사용할것인가 어디서 어디로 옮길것인지 스냅샷이 넘어옴
    retrieve = (route: ActivatedRouteSnapshot): DetachedRouteHandle => this.handlers[this.getURL(route)];
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void { // 위에서 저장하기로 한 스냅샷을 저장해둠
        this.handlers[this.getURL(route)] = handle;
    }
    
    // routeSnapShot에서 url을 계산해서 리턴
    getURL(route: ActivatedRouteSnapshot) {

        let next = route, url = '';

        while(next){
            
            if (next.url) url = next.url.join('/');
            
            next = next.firstChild;
        }
        
        return '/' + url;
    }

}