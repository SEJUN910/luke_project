function img(c){
    const d1 = c.substr(-4,1);
    const d2 = c.substr(-3,1);
    if ( d1 === '-' || d1 === '_' ) d1='0';
    if ( d2 === '-' || d2 === '_' ) d2='0';
    
    return '/'+d1+'/'+d2+'/'+c+'/200_'+c+'.jpg';
}

function s_img(c){
    const d1 = c.substr(-4,1);
    const d2 = c.substr(-3,1);
    if ( d1 === '-' || d1 === '_' ) d1='0';
    if ( d2 === '-' || d2 === '_' ) d2='0';
    
    return '/'+d1+'/'+d2+'/'+c+'/s_'+c+'.gif';
}

function user_kind(k) {
    if( k === 'Z'){
        return '직원';
    } else if ( k === 'S' ){
        return '일반';
    } else if ( k === 'X' ){
        return '블락';
    } else {
        return '분류오류';
    }
}

function user_level(l) {
    if ( l === '1' ){
        return '일반';
    } else if ( l === 'B' ){
        return '우수';
    } else if ( l === 'I' ){
        return 'VIP';
    } else if ( l === 'P' ){
        return '목회자';
    } else {
        return '분류불가';
    }
}

function treat(t) {
    if( t === 'C'){
        return '취소됨(C)';
    } else if ( t === 'A'){
        return '주문준비(A)'; 
    } else if ( t === 'B'){
        return '부분발송(B)';
    } else if ( t === 'P'){
        return '품절됨(P)'; 
    } else if ( t === 'X'){
        return '절판됨(X)';
    } else if ( t === 'S'){
        return '발송준비중(S)';
    } else if ( t === 'F'){
        return '발송완료(F)';
    } else if ( t === ''){
        return '미결제()';
    }
}

function treat_color(t) {
    if( t == 'C'){
        return '#ff1744';
    } else if ( t === 'A'){
        return '#4caf50'; 
    } else if ( t === 'B'){
        return '#ff5722';
    } else if ( t === 'P'){
        return '#673ab7'; 
    } else if ( t === 'X'){
        return '#ff1744';
    } else if ( t === 'S'){
        return '#009688';
    } else if ( t === 'F'){
        return '#3d5afe';
    } else if ( t === ''){
        return '#b26a00'
    }
}

function numComma(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function mailingChecked(m) {
    if( m === 'Y') {
        return true;
    } else if ( m === 'N' ){
        return false;
    }
}

function storageBoolean(e){
    if ( e === 'true' ){
        return true
    } else if ( e === 'false' ){
        return false
    }
} 

function callTimer(t) {
    var days = parseInt( t / 86400 );
    var hours = parseInt( t / 3600 ) % 24;
    var minutes = parseInt( t / 60 ) % 60;
    var seconds = t % 60;

    if ( t < 60) {
        return seconds + '초전';
    } else if ( t >= 60 && t < 3600 ) {
        return minutes + '분전';
    } else if ( t >= 3600 && t < 86400 ) {
        return hours + '시간전';
    } else if ( t >= 86400 ) {
        return days + '일전';
    }
}

function bibleKindPosition(b){
    if(b === 'bible'){
        return 'float-start';
    } else {
        return 'float-end'
    }
}

function numName(p){
    if( p === '400' ) return '여진구'
        else if( p === '135' ) return p+' (조한상)'
        else if( p === '511' ) return p+' (최인섭)'
        else if( p === '403' ) return p+' (김구현)'
        else if( p === '402' ) return p+' (김명아)'
        else if( p === '401' ) return p+' (김병숙)'
        else if( p === '507' ) return p+' (김희동)'
        else if( p === '512' ) return p+' (권혁준)'
        else if( p === '510' ) return p+' (김성훈)'
        else if( p === '516' ) return p+' (김은호)'
        else if( p === '513' ) return p+' (장석경)'
        else if( p === '514' ) return p+' (윤현수)'
        else if( p === '110' ) return p+' (유연정)'
        else if( p === '111' ) return p+' (함명인)'
        else if( p === '503' ) return p+' (김현성)'
        else if( p === '504' ) return p+' (박세준)'
        else if( p === '501' ) return p+' (임규완)'
        else if( p === '505' ) return p+' (주요섭)'
        else if( p === '502' ) return p+' (최지연)'
        else if( p === '106' ) return p+' (김한석)'
        else if( p === '506' ) return p+' (김홍기)'
        else if( p === '108' ) return p+' (송정은)'
        else if( p === '105' ) return p+' (안지영)'
        else if( p === '104' ) return p+' (이영은)'
        else if( p === '115' ) return p+' (이태윤)'
        else if( p === '223' ) return p+' (최주명)'
        else if( p === '103' ) return p+' (한동일)'
        else if( p === '119' ) return p+' (홍은화)'
        else if( p === '107' ) return p+' (김진아)'
        else if( p === '204' ) return p+' (박은영)'
        else if( p === '201' ) return p+' (한윤희)'
        else if( p === '114' ) return p+' (함성현)'
        else if( p === '203' ) return p+' (강승철)'
        else if( p === '207' ) return p+' (박성은)'
        else if( p === '202' ) return p+' (박은하)'
        else if( p === '205' ) return p+' (주슬아)'
        else if( p === '216' ) return p+' (무선전화)'
        else return p;
}

function bibleGiftCondition(t){
    if( t === 'created'){
        return '전화요청';
    } else if ( t === 'checking') {
        return '상담완료';
    } else if ( t === 'waiting') {
        return '결제대기';
    } else if ( t === 'paid' ) {
        return '결제완료';
    } else if ( t === 'servicing') {
        return '사용가능';
    } else if ( t === 'finished') {
        return '종료됨';
    } else if ( t === 'canceled') {
        return '취소됨';
    }
}

const itemsArray = [
    { code: 'B1', title: "개역개정" },
    { code: 'B2', title: "새번역" },
    { code: 'B3', title: "쉬운성경" },
    { code: 'B4', title: "우리말성경" },
    { code: 'B5', title: "NIV" },
    { code: 'B6', title: "ESV" },
    { code: 'B7', title: "NLT" }, 
    { code: 'B8', title: "NASB" }, 
    { code: 'A1', title: "개역개정 음원" },
    { code: 'A3', title: "쉬운성경 음원" },
    { code: 'A4', title: "우리말성경 음원" },
    { code: 'A5', title: "NIV 음원" },
    { code: 'A6', title: "ESV 음원" },
    { code: 'A7', title: "NLT 음원" }, 
];

function updateStateName(t) {
    if( t === 'created' ) {
        return '전화요청(신청완료)';
    } else if ( t === 'checking' ) {
        return '상담완료(검토중)';
    } else if ( t === 'waiting' ) {
        return '결제대기(결제대기 중)';
    } else if ( t === 'paid' ) {
        return '결제완료(결제완료)';
    } else if ( t === 'servicing' ) {
        return '사용가능(서비스 중)';
    } else if ( t === 'finished' ) {
        return '종료됨(마감됨)';
    } else if ( t === 'canceled' ) {
        return '취소됨(취소)';
    } else {
        return '분류불가오류';
    }
}


export { img, s_img, user_kind, user_level, numComma, treat, treat_color, mailingChecked, storageBoolean, callTimer, bibleKindPosition, numName, bibleGiftCondition, updateStateName };