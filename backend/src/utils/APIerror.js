class APIerror extends Error{
    constructor(
        status,
        message,
        error=[],
      
    ){
        super(message)
this.status = status
this.data = null,
this.message = message,
this.error=error
    }
}

export {APIerror}