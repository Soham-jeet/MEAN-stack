const generateCrudMethods =  Model => {
    return {
        getAll : () => Model.find(),
        getById : id => Model.findById(id),
        create : record => Model.create(record),
        
    }
}