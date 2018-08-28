var apod = {
    randomDate: function(start, end){
        var date = new Date(
            start.getTime() + Math.random() * 
            (end.getTime() - start.getTime())
        );

        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();

        if(m<10){
            m = '0'+m;
        }

        if(d<10){
            d = '0'+d;
        }

        return y + '-' + m + '-' + d;
    },
    init: function(){
        //var date = '2013-06-06';
        var date = this.randomDate(new Date(1995,5,16), new Date());
        console.log(date);
        var key = 'xYpVHthqInxK0wzGAEYgSpkoeIwonVdbpQ59dizB';
        var uri = 'https://api.nasa.gov/planetary/apod?api_key=' 
            + key
            + '&date=' + date;

        var xhr = new XMLHttpRequest();

        xhr.open('GET', uri, true);

        xhr.onload = function () {
          var result = JSON.parse(xhr.response);
          document.getElementById('apodTitle').innerHTML=result.title;
          document.getElementById('apodCopyright').innerHTML=result.copyright;
          document.getElementById('apodDate').innerHTML=result.date;
          document.getElementById('apodDesc').innerHTML=result.explanation;

          if(result.media_type === 'video'){
            document.querySelector('#apodImg').style.display = 'none';
            document.querySelector('#apodVideo > iframe').src = result.url;
            document.querySelector('#apodVideo').style.display = 'block';
          }else{
            document.querySelector('#apodVideo').style.display = 'none';
            document.querySelector('#apodImg').src = result.hdurl;
            document.querySelector('#apodImg').alt =  result.title;
            document.querySelector('#apodImg').style.display = 'block';
          }
        };
        
        xhr.send(null); 

        /*
        $.ajax({
            url: uri
        })
        .done(function(result){
            
            $('#apodTitle').text(result.title);
            $('#apodCopyright').text(result.copyright);
            $('#apodDate').text(result.date);
            $('#apodDesc').text(result.explanation);

            if(result.media_type === 'video'){
                $('#apodImg').hide();
                $('#apodVideo > iframe')
                    .attr('src', result.url)
                    .show();
            }else{
                $('#apodVideo').hide();
                $('#apodImg')
                    .attr('src', result.hdurl)
                    .attr('alt', result.title)
                    .show();
            }
        


            console.log(result);

        })
        .fail(function(result){
            console.log(result);
        });
        */
    }
}

apod.init();

$(function(){
    $('#btnRandApod').on('click', function(){
        apod.init();
    });
});