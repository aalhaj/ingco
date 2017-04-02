<?php
include 'config/db.php';
include 'config/constants.php';
header("Content-Type: text/html;charset=UTF-8");
$db = new DB();
$actionSuccessMSG="";
$actionFailsMSG="";
if(isset($_REQUEST['type']) && !empty($_REQUEST['type'])){
    $tblName = "";
    if(!empty($_REQUEST['table']))
      $tblName = $_REQUEST['table'];
    $type = $_REQUEST['type'];

    if($tblName == 'category'){
      if($type == 'add'){
        $actionSuccessMSG=CATEGORY_ADD_MSG;
        $actionFailsMSG=CATEGORY_ADD_ERR_MSG;
      }else if($type == 'delete'){
        $actionSuccessMSG=CATEGORY_DELETE_MSG;
        $actionFailsMSG=CATEGORY_DELETE_ERR_MSG;
      }else if($type == 'edit'){
        $actionSuccessMSG=CATEGORY_EDIT_MSG;
        $actionFailsMSG=CATEGORY_EDIT_ERR_MSG;
      }
    }else if($tblName == 'product'){
      if($type == 'add'){
        $actionSuccessMSG=PRODUCT_ADD_MSG;
        $actionFailsMSG=PRODUCT_ADD_ERR_MSG;
      }else if($type == 'delete'){
        $actionSuccessMSG=PRODUCT_DELETE_MSG;
        $actionFailsMSG=PRODUCT_DELETE_ERR_MSG;
      }else if($type == 'edit'){
        $actionSuccessMSG=PRODUCT_EDIT_MSG;
        $actionFailsMSG=PRODUCT_EDIT_ERR_MSG;
      }
    }else if($tblName == 'gallery'){
      if($type == 'add'){
        $actionSuccessMSG=GALLERY_ADD_MSG;
        $actionFailsMSG=GALLERY_ADD_ERR_MSG;
      }else if($type == 'delete'){
        $actionSuccessMSG=GALLERY_DELETE_MSG;
        $actionFailsMSG=GALLERY_DELETE_ERR_MSG;
      }else if($type == 'edit'){
        $actionSuccessMSG=GALLERY_EDIT_MSG;
        $actionFailsMSG=GALLERY_EDIT_ERR_MSG;
      }
    }

    switch($type){
        case "view":
            $records = $db->getRows($tblName);
            if($records){
                $data['records'] = $db->getRows($tblName);
                $data['status'] = 'OK';
            }else{
                $data['records'] = array();
                $data['status'] = 'ERR';
            }
            echo json_encode($data);
            break;
        case "add":
            if(!empty($_POST['data'])){
                $userData = array();
                foreach($_POST['data'] as $k => $v){
                    $userData[$k]=$v;
                }
                $insert = $db->insert($tblName,$userData);
                if($insert){
                    $data['data'] = $insert;
                    $data['status'] = 'OK';
                    $data['msg'] = $actionSuccessMSG;
                    createStoreJSON($db);
                }else{
                    $data['status'] = 'ERR';
                    $data['msg'] = $actionFailsMSG;
                }
            }else{
                $data['status'] = 'ERR';
                $data['msg'] = $actionSuccessMSG;
            }
            echo json_encode($data);
            break;
        case "edit":
            if(!empty($_POST['data'])){
                $userData = array();
                foreach($_POST['data'] as $k => $v){
                  if($k != 'oldimage')
                    $userData[$k]=$v;
                }
                $condition = array('id' => $_POST['data']['id']);
                $update = $db->update($tblName,$userData,$condition);
                if($update){
                    if($tblName == 'category')  deleteOldImage('oldimage',CATEGORIES_DIR);
                    if($tblName == 'product')  deleteOldImage('oldimage',PRODUCTS_DIR);
                    if($tblName == 'carousel')  deleteOldImage('oldimage',CAROUSEL_DIR);

                    $data['status'] = 'OK';
                    $data['msg'] = $actionSuccessMSG;
                }else{
                    $data['status'] = 'ERR';
                    $data['msg'] = $actionFailsMSG;
                }
                createStoreJSON($db);
            }else{
                $data['status'] = 'ERR';
                $data['msg'] = $actionFailsMSG;
            }
            echo json_encode($data);
            break;
        case "editStoreSettings":
            if(!empty($_POST['data'])){
                $update = false;
                foreach($_POST['data'] as $k => $v){
                  $condition = array('s_key' => $v['s_key']);
                  $update = $db->update($tblName,array('s_value' => $v['s_value']),$condition);
                  $update= $update || $update;
                }

                if($update){
                    $data['status'] = 'OK';
                    $data['msg'] = $actionSuccessMSG;
                }else{
                    $data['status'] = 'ERR';
                    $data['msg'] = $actionFailsMSG;
                }
                createStoreJSON($db);
            }else{
                $data['status'] = 'ERR ';
                $data['msg'] = $actionFailsMSG;
            }
            echo json_encode($data);

            break;
        case "delete":
            if(!empty($_POST['id'])){
                $condition = array('id' => $_POST['id']);
                $delete = $db->delete($tblName,$condition);
                if($delete){

                  if($tblName == 'category')  deleteOldImage('image',CATEGORIES_DIR);
                  if($tblName == 'product')  deleteOldImage('image',PRODUCTS_DIR);
                  if($tblName == 'carousel')  deleteOldImage('image',CAROUSEL_DIR);

                  $data['status'] = 'OK';
                  $data['msg'] = $actionSuccessMSG;
                  createStoreJSON($db);
                }else{
                    $data['status'] = 'ERR';
                    $data['msg'] = $actionFailsMSG;
                }
            }else{
                $data['status'] = 'ERR';
                $data['msg'] = $actionFailsMSG;
            }
            echo json_encode($data);
            break;
        case "verify":

          $verify = $db->verfiyUser($_POST['data']['username'],$_POST['data']['password']);
          if($verify){
              $data['status'] = true;
          }else{
              $data['status'] = false;
          }
          echo json_encode($data);
          break;
        default:
            echo '{"status":"INVALID"}';
    }
}

function deleteOldImage($img,$dir){
  if($_POST['data']['image'] != $_POST['data'][$img] && $_POST['data'][$img] != "") {
    if(file_exists($dir.$_POST['data'][$img]))
      unlink($dir.$_POST['data'][$img]);
     if(file_exists($dir.'thumbnail/'.$_POST['data'][$img]))
      unlink($dir.'thumbnail/'.$_POST['data'][$img]);
  }
}

function createStoreJSON($db){
  $storeData['categories'] = $db->getRows('category');
  $storeData['products'] = $db->getRows('product');
  $storeData['gallery'] = $db->getRows('gallery');
  $storeData['carousel'] = $db->getRows('carousel');
  file_put_contents(STORE_JSON_FILE_DIR,json_encode($storeData),LOCK_EX);

  $settings = $db->getRows('settings');
  $settingsA=[];

  foreach ($settings as $k => $v) {
    $settingsA[$v['s_key']] = $v['s_value'];
  }
  file_put_contents(STORE_SETTINGS_JSON_FILE_DIR,json_encode($settingsA),LOCK_EX);
}
