var app = angular .module('MainWindow', []);

    app.controller('MainCtrl', function($scope) {

    	$scope.arrItemRate = ["Tax Exclusive","Tax Inlusive"];

    	$scope.selectedtype = "";
        $scope.netvalue=0;
        $scope.payterms ="";

        $scope.currDate = new Date();

         $scope.duedate = new Date();
			$scope.duedate.setDate(10);
			 $scope.seleman ="himanshu";
			 $scope.itemRateare ="";
			 $scope.SupplyType ="";
             
             $scope.addKeyword ="";
             $scope.adamount =0;

             $scope.totalAmount =0;

             /***********************************/
                        $scope.collumnDetail =[];

                
                    var getjson = function(fix){

                      return {  "count" :fix,
                         "item" : "",
                        "hsn" : "",
                        "qty" : "",
                        "unit" :"",
                        "rate" : "",
                        "discount" : "",
                        "taxable" : "xx",
                        "igst":{'percent' :'18','amt':''},
                       "cess" :{'percent' :'','amt':''},
                        "total" : "",
                    };




                    };


                    // var obj=    {"item" : "","hsn": "","qty" : "","unit" : "","rate" : "","discount" : "","igst" : {
                    //                                 "percent" : "18",
                    //                                 "amt" : ""
                    //                             },
                    //                             "cess" : {
                    //                                 "percent" : "",
                    //                                 "amt" : ""
                    //                             },
                    //                             "total" : ""
                    //                         };

                                   


                      // var obj  = new getjson();
                      // obj.count = 1;

                        $scope.collumnDetail.push(new getjson(1));
                        


            $scope.generateInvoice = function(){

                        console.log($scope.collumnDetail[0]); 
            }
 $scope.addobj = function(){
          $scope.collumnDetail.push(new getjson());
                        console.log($scope.collumnDetail[0]); 
            }
             /***********/

	    $scope.onSelectChange = function(vaue){
               // $scope.counter++; 

      console.log(vaue);
        };
        $scope.changenet = function(index){

        	$scope.payterms =index.payterms;
            console.log(index);
            $scope.updateDueDate($scope.payterms);//when user name change
        };
        
        $scope.updateDueDate = function(index){
        	console.log("hello"+index);

        	if (index=="net-10") 
        	{
        		console.log("hello1 "+index);

        		$scope.duedate.setDate(10);


        	}
        	if (index=="net-15") {
        		$scope.duedate.setDate(15);

        	}

        };
       
        $scope.arrInvoice = [
        {
				"name" : "bill for Supply",
				"selected": false,

        },

        	{
				"name":"tex invoice",
				"selected": true,


        	},

        	{
				"name":"Export",
				"selected": false,

        	},

        	{
				"name":"other",
				"selected": false,

        	}
        ];
       $scope.invoiceType= $scope.arrInvoice[1];

        $scope.arrpayterms =["net-10","net-15","net-20"];


        $scope.arrofCustomerDetail =[
			{
				'name':'himanshu',
				'mainAdrress':'odee deew deeee',
				'shipingAdrress':'chaina losa fdsa',
				'payterms':"net-10",
			},
			{
				'name':'keyur',
				'mainAdrress':'odee ddd ddd',
				'shipingAdrress':'india losa fdsa',
				'payterms':"net-15",

			},

        ];
        



/************/
// 


      // $scope.tableHeaderItems = ["#","item","hsn","qty","unit",
      //                             "rate/item","discount","taxable value",
      //                             "igst","cess","total"];
      $scope.tableHeaderItems = [
                                  {
                                    "firstRow":"#",
                                    "rowspan":"2",
                                    "colspan":"1",
                                  },
                                  {
                                    "firstRow":"item",
                                    "rowspan":"2",
                                    "colspan":"1",
                                  },
                                  {
                                    "firstRow":"hsn",
                                    "rowspan":"2",
                                    "colspan":"1",
                                  },
                                  {
                                    "firstRow":"qty",
                                    "rowspan":"2",
                                    "colspan":"1",
                                  },
                                  {
                                    "firstRow":"unit",
                                    "rowspan":"2",
                                    "colspan":"1",
                                  },
                                  {
                                    "firstRow":"rate/item",
                                    "rowspan":"2",
                                    "colspan":"1",
                                  },
                                  {
                                    "firstRow":"discount",
                                    "rowspan":"2",
                                    "colspan":"1",
                                  },
                                  {
                                    "firstRow":"taxable value",
                                    "rowspan":"2",
                                    "colspan":"1",
                                  },
                                  {
                                    "firstRow":"igst",
                                    "rowspan":"1",
                                    "colspan":"2",
                                  },
                                  {
                                    "firstRow":"cess",
                                    "rowspan":"1",
                                    "colspan":"2",
                                  },
                                  {
                                    "firstRow":"total",
                                    "rowspan":"2",
                                    "colspan":"1",
                                  },
                                  {
                                    "firstRow":"",
                                    "rowspan":"2",
                                    "colspan":"1",
                                  },
                                ];



                                var $table = $('table.invoice'),
                                        counter = 1;
                                    
                                //     $('button.add').click(function(event){

                                //         $scope.collumnDetail.push(obj);
                                //          $scope.$apply();

                                //         // $scope.collumnDetail.push(new rowdetail());
                                //         console.log($scope.collumnDetail.length);

                                //         console.log("add me");
                                //         event.preventDefault();
                                //         counter++;
                                //         var newRow = 
                                //             '<tr>' + 
                                //                 '<td><input type="text" name="'+ counter +'"  class="form-control"></td>'+     
                                //                 '<td><input type="text" name="' + counter + '"/></td>' +
                                //                 '<td><input type="text" name="' + counter + '"/></td>' +
                                //                 '<td><input type="text" name="' + counter + '"/></td>' +
                                //                 '<td><input type="text" name="' + counter + '"/></td>' +
                                //                 '<td><input type="text" name="' + counter + '"/></td>' +
                                //                 '<td><input type="text" name="' + counter + '"/></td>' +
                                //                 '<td><input type="text" name="' + counter + '"/></td>' +
                                //                 '<td><input type="text" name="' + counter + '"/></td>' +
                                //                 '<td><input type="text" name="' + counter + '"/></td>' +
                                //                 '<td><input type="text" name="' + counter + '"/></td>' +
                                //                 '<td><input type="text" name="' + counter + '"/></td>' +
                                //                 '<td><input type="text" name="' + counter + '"/></td>' +
                                //                 '<td><button class="btn btn-sm btn-danger btn-xs btn-push remove" name="last_name' + counter + '" type="button">Delete</button></td>'
                                //             '</tr>';
                                //         $table.append(newRow);
                                //     });
                                    
                                    $table.on('click', '.remove', function() {
                                        $(this).closest('tr').remove();
                                    });





    });


   

// app.directive('dateInput', function(){
//     return {
//         restrict : 'A',
//         scope : {
//             ngModel : '='
//         },
//         link: function (scope) {
//         	console.log("nnnnnnnnnnnnn");
//             if (scope.ngModel) scope.ngModel = new Date(scope.ngModel);
//         }
//     }
// });


