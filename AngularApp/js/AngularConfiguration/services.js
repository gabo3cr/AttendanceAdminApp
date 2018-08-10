var Webservice = function($http, Constants)
{

    function Get(url)
    {
        return $http.get(Constants.urlServices + url).then(DefaultSuccessFunction, DefaultErrorFunction);
    }

    function GetJSON(url)
    {
        return $http.get(url).then(DefaultSuccessFunction, DefaultErrorFunction);
    }

    function Post(url, parameters)
    {
        return $http.post(Constants.urlServices + url, parameters).then(DefaultSuccessFunction, DefaultErrorFunction);
    }

    function DefaultSuccessFunction(data)
    {
        if(data == null || data.status != 200)
        {
            DefaultErrorFunction(data);
        }
        else if(data.status == 200)
        {
            return data.data;
        }
    }

    function DefaultErrorFunction(data)
    {
        var error =
            {
                "message": "",
                "success": false
            };
        if(data == null)
        {
            error.message = "Error, compruebe su conexión";
        }
        else if(data.status == 404)
        {
            error.message = "No se encontró el recurso.";
        }
        return error;
    }

    return {
        Get: Get,
        GetJSON: GetJSON,
        Post: Post
    };
};

app.factory("Webservice", Webservice);