/*
    매개변수(parameter) : 외부의 특정 값을 함수 내부로 전달해주는 통로
    인수(argument) : 매개변수를 통해 직접적으로 전달되는 값
*/

//게시글 json데이터 위치 전역변수에 저장
const url = "data/board.json";
//동적으로 생성할 테이블의 위치 전역변수에 저장
const frame = $(".community .inner");

//callDate함수에 주소값을 호출한뒤 나온
//데이터 배열을 변수 resultDate에 저장
const resultData = callData(url);

//createTable함수에 타켓위치와, 배열데이터를 인수로 넣어서
//동적으로 테이블 생성완료
createTable(frame, resultData);

/* asnyc true면 비동기인데, true라 하면
callData함수 실행이랑 ajax로 데이터 끌어오는게 동시에 이뤄져서 값이
return result;로 내보내면 undefined가 뜬다.
*/

//json데이터로부터 게시글 내용을 배열로 반환해주는 함수 정의
function callData(url) {
    //배열값을 저장할 빈 변수 result생성
    let result;
    
    //async가 비동기, 해당 ajax문을 동기화 시켜서
    //모든 데이터가 잘 받아지면
    //실시간으로 외부 서버의 데이터 가져옴
    $.ajax({
        url : url,
        dataType : "json",
        async : false //무조건 ajax구문이 끝나야 다음 구문이 순차적으로 실행되게 하는 구문
    })
    .success((data)=>{ //function대신 => 으로 축약할수있다.
        //불러온 데이터 덩어리 안쪽에서 배열만 위쪽에 만든
        //빈 변수 result에 저장
        result = data.board;
        console.log(result);
    })
    .error((err)=>{
        console.error(err);
    });

    //해당 데이터값을 callData함수 밖으로
    //배열이 담겨있는 변수 result를 함수 외부로 내보냄(//배열 형태로 내보냄)
    return result;
}

//대상위치와 배열을 인수로 받아서 동적으로 테이블 생성해주는 함수 정의
function createTable(target, data) {
    //table과 그 안에 caption, thead, tbody 하나만 생성
    target.append(
        $("<table>")
            .attr("summary","자유게시판의 글번호, 제목, 작성자")
            .append(
                $("<caption class='hidden'>").text("자유게시판"),
                $("<thead>")
                    //thead안쪽에 tr을 하나만 만듬
                    .append(
                        //다시 제목줄 안쪽에는 첫번째 th만 하나 만듬
                        $("<tr>")
                            .append( '<th scope="col">No</th>')
                    ),
                //tbody도 하나만 만듬
                "<tbody>"
            )
    );

    //제목줄에 나머지 th태그 3개를 객체 하나의 키값을 갯수만큼
    //반복을 돌면서 key값의 이름을 th의 제목으로 설정
    for(let key in data[0]){
        console.log(key);
        target.find("thead tr")
            .append(
                $("<th scope='col'>").text(key)
            )
    }

    /*
      for of : 배열을 반복
      for in : 객체의 키값을 반복
    */      

    //tbody안쪽에서 이번에는 배열의 갯수만큼 반복을 돌면서
    //tr생성하고 그 안쪽에 td도 생성
    for(let i=0; i<data.length; i++) {
        //tbody를 찾은 뒤
        target.find("tbody")
            //tr생성을 위해 prepend로 위쪽에 삽입
            //나중에 작성된 최신글이 게시글 상단에 있어야 되기 때문
            .prepend(
                $("<tr>")
                    .append(
                        //i값 증가시켜서 글번호 생성
                        $("<td>").text(i+1),
                        //각 반복을 도는 배열안의 객체값을 활용해서
                        //나머지 td값을 생성
                        $("<td>")
                            .append(
                                $("<a>").attr("href","#").text(data[i].title)
                            ),
                        $("<td>").text(data[i].writer),
                        $("<td>").text(data[i].date)
                    )
            )
    }
}