
const {remote} = require('electron');
const {BrowserWindow, dialog, shell} = remote;
const fs = require('fs');


var rootApp = angular.module('rootApp', ['MainWindow']);


// var firstApp = angular.module('firstApp', []);
//     firstApp.controller('FirstController', function($scope) {
//       $scope.desc = "First app. ";
//     });

var MainWindow = angular.module('MainWindow', []);
 

    MainWindow.controller('MainCtrl', function($scope, $filter) {
      let print_win;
      let save_pdf_path;

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
             $scope.gstTotal =0;
            $scope.cesstotal =0;
             $scope.discounttotal =0;
             $scope.taxabletotal =0;

             /***********************************/
               $scope.collumnDetail =[];
              var getjson = function(fix){
                      return {  
                        "count" :fix,
                         "item" : "",
                        "hsn" : "",
                        "qty" : "1",
                        "unit" :"Kg",
                        "rate" : "",
                        "discount" : "",
                        "taxable" : "",
                        "igst":{'percent' :'18','amt':''},
                       "cess" :{'percent' :'','amt':''},
                        "total" : "",
                    };};


                 $scope.collumnDetail.push(new getjson($scope.collumnDetail.length+1));
                        


                                 $scope.generateInvoice = function(){

                                   const remote = require('electron').remote;
                                            const BrowserWindow = remote.BrowserWindow;

                                            // var win = new BrowserWindow({ width: 800, height: 600 });
                                            // win.loadURL('file://' + __dirname + '/views/about.html');
                                 print_win = new BrowserWindow({'auto-hide-menu-bar':true});
                                print_win.loadURL('file://' + __dirname + '/print.html');
                                  print_win.show();

                                  print_win.webContents.on('did-finish-load', function() {
                               document.getElementById('print_button').addEventListener('click', print);
                                              document.getElementById('save_pdf_button').addEventListener(
                                                'click', savePDF);
                                              document.getElementById('view_pdf_button').addEventListener(
                                                'click', viewPDF);
                                            });
                                            print_win.on('closed', function() {
                                              print_win = null;
                                            });
                                              };
                                 $scope.addobj = function(){
                                     $scope.collumnDetail.push(new getjson($scope.collumnDetail.length+1));
                                     };
                                    $scope.delete = function (index) {

                                        console.log("index");
                                       $scope.collumnDetail.splice(index, 1);
                                       $scope.updatesubAmount();
                                    }   
                                $scope.updateCellwith = function(arr){

                                    if(arr!=null)
                                    {
                                     console.log("heeee");
                                    console.log(arr);

                                    arr.taxable = (arr.qty*arr.rate)-arr.discount;
                                     console.log(arr.taxable);
                                     arr.igst.amt = arr.taxable*arr.igst.percent/100;
                                      arr.cess.amt = arr.taxable*arr.cess.percent/100;
                                     arr.total = Number(arr.taxable)+Number(arr.igst.amt)+Number(arr.cess.amt); 
                                   }


                                   $scope.updatesubAmount();
                                     // console.log(arr.taxable);

                                     }; 
                                     /***********/

                                     $scope.updatesubAmount = function()
                                     {

                                    var subTotal = 0;
                                    var gstTotal = 0;
                                    var cessTotal = 0;
                                     var discounttotal =0;
                                     var taxabletotal =0;
                                    console.log($scope.collumnDetail.length);

                                    if($scope.collumnDetail.length==0)
                                    {

                                       $scope.gstTotal =0;
                                    $scope.cesstotal =0;
                                    $scope.discounttotal =0;
                                     $scope.taxabletotal =0;
                                    }
                                    for(var count = 0; count < $scope.collumnDetail.length; count++){
                                            
                                            console.log(subTotal);


                                      subTotal += ($scope.collumnDetail[count].total);
                                       gstTotal += ($scope.collumnDetail[count].igst.amt);
                                       cessTotal += ($scope.collumnDetail[count].cess.amt);
                                        discounttotal += ($scope.collumnDetail[count].discount);
                                         taxabletotal += ($scope.collumnDetail[count].taxable);

                                       console.log($scope.totalAmount);

                                    $scope.gstTotal =gstTotal;
                                    $scope.cesstotal =cessTotal;
                                    $scope.discounttotal =discounttotal;
                                     $scope.taxabletotal =taxabletotal;

                                    }

                                     $scope.totalAmount =Number($scope.gstTotal)+Number($scope.cesstotal)-Number($scope.discounttotal)+Number($scope.taxabletotal);

                                    if(!isNaN($scope.adamount))
                                     $scope.totalAmount =$scope.totalAmount+Number($scope.adamount);

                                     }

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
                                  document.getElementById("duedate").value = $filter("date")($scope.duedate, 'yyyy-MM-dd');
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
                                                              "firstRow":"Item",
                                                              "rowspan":"2",
                                                              "colspan":"1",
                                                            },
                                                            {
                                                              "firstRow":"HSN",
                                                              "rowspan":"2",
                                                              "colspan":"1",
                                                            },
                                                            {
                                                              "firstRow":"QTY",
                                                              "rowspan":"2",
                                                              "colspan":"1",
                                                            },
                                                            {
                                                              "firstRow":"Unit",
                                                              "rowspan":"2",
                                                              "colspan":"1",
                                                            },
                                                            {
                                                              "firstRow":"Rate/Item",
                                                              "rowspan":"2",
                                                              "colspan":"1",
                                                            },
                                                            {
                                                              "firstRow":"Discount",
                                                              "rowspan":"2",
                                                              "colspan":"1",
                                                            },
                                                            {
                                                              "firstRow":"Taxable Value",
                                                              "rowspan":"2",
                                                              "colspan":"1",
                                                            },
                                                            {
                                                              "firstRow":"IGST",
                                                              "rowspan":"1",
                                                              "colspan":"2",
                                                            },
                                                            {
                                                              "firstRow":"CESS",
                                                              "rowspan":"1",
                                                              "colspan":"2",
                                                            },
                                                            {
                                                              "firstRow":"Total",
                                                              "rowspan":"2",
                                                              "colspan":"1",
                                                            },
                                                            // {
                                                            //   "firstRow":"",
                                                            //   "rowspan":"2",
                                                            //   "colspan":"1",
                                                            // },
                                                          ];



                                                          // var $table = $('table.invoice'),
                                                          //         counter = 1;
                                                              
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
                                                              
                                                              // $table.on('click', '.remove', function() {
                                                              //     $(this).closest('tr').remove();
                                                              // });





                          function print() {
                            if (print_win)
                              print_win.webContents.print();
                          }

                          function savePDF() {
                            if (!print_win) {
                              dialog.showErrorBox('Error', "The printing window isn't created");
                              return;
                            }
                            dialog.showSaveDialog(print_win, {}, function(file_path) {
                              if (file_path) {
                                print_win.webContents.printToPDF(getPDFPrintSettings(), function(err, data) {
                                  if (err) {
                                    dialog.showErrorBox('Error', err);
                                    return;
                                  }
                                  fs.writeFile(file_path, data, function(err) {
                                    if (err) {
                                      dialog.showErrorBox('Error', err);
                                      return;
                                    }
                                    save_pdf_path = file_path;
                                    // document.getElementBy('output-log').innerHTML =
                                    //   "<p> Write PDF file: " + save_pdf_path + " successfully!</p>";
                                  });
                                });
                              }
                             });
                             }

              function viewPDF() {
                if (!save_pdf_path) {
                  dialog.showErrorBox('Error', "You should save the pdf before viewing it");
                  return;
                }
                shell.openItem(save_pdf_path);
              }
              function getPDFPrintSettings() {
                var option = {
                  landscape: false,
                  marginsType: 0,
                  printBackground: false,
                  printSelectionOnly: false,
                  pageSize: 'A4',
                };
                return option;
              }

});




// var moduleNew = angular.module('newdemo', []);

// moduleNew.controller('OtherController', function () {
//     // ...do something
// });
   

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


