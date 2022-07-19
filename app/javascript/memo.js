function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    //これ書かないと、javascriptからと、ブラウザからの2つのリクエストが→ブラウザからのリクエストを無効化
    const form = document.getElementById("form");
    //要素を取得してform変数に代入
    const formData = new FormData(form);
    //取得した要素(form)に入力された値を取得してformdata変数に代入
    const XHR = new XMLHttpRequest();
    //XMLHttpRequestオブジェクト(リクエストを送信するのに必要)を生成してXHR変数に代入
    XHR.open("POST", "/posts", true);
    //リクエストの内容を指定・・・open("HTTPメソッド", "パス", true)
    XHR.responseType = "json";
    //レスポンスの形式(データフォーマット)を指定しておく(今回はJSON)
    XHR.send(formData);
    //データ送信
  });
};

window.addEventListener('load', post);