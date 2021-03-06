package host.exp.exponent;

import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ShareModule extends ReactContextBaseJavaModule {

    private Context mContext;
    private Handler mHandler = new Handler(Looper.getMainLooper());

    public ShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CustomShareModule";
    }

    @ReactMethod
    public void shareText(String text) {
        String text2 = "" + text;

        Intent sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_TEXT, text2);
        sendIntent.setType("text/plain");
        this.getReactApplicationContext().startActivity(Intent.createChooser(sendIntent, ""));
    }

    @ReactMethod
    public void shareImage(final String text, final String url) {
        mContext = this.getReactApplicationContext();
        mHandler.post(new Runnable() {
            @Override
            public void run() {
                final Uri pictureUri = Uri.parse("" + url);

                Target target = new Target() {
                    @Override
                    public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
                        Uri bitmapUri = getLocalBitmapUri(bitmap, mContext, "share_img.png");

                        final Intent shareIntent = new Intent();
                        shareIntent.setType("image/*");
                        shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                        shareIntent.putExtra(Intent.EXTRA_TEXT, "holaaa");
                        shareIntent.putExtra(Intent.EXTRA_STREAM, bitmapUri);
                        mContext.startActivity(Intent.createChooser(shareIntent, "Compartir usando"));

                    }

                    @Override
                    public void onBitmapFailed(Drawable errorDrawable) {
                        Log.d("JAVABRIDGE", "SHARE IMAGEN TARGET Ex: " + errorDrawable);
                    }

                    @Override
                    public void onPrepareLoad(Drawable placeHolderDrawable) {
                    }
                };
                Picasso.with(mContext).load(pictureUri).into(target);
            }
        });
    }


    @ReactMethod
    public void share(final String text,
                      final ReadableArray fileNames,
                      final ReadableArray descriptions,
                      final ReadableArray urls) {
        Log.d("JAVABRIDGE", "filenames "+fileNames);
        Log.d("JAVABRIDGE", "descriptions "+descriptions);
        Log.d("JAVABRIDGE", "urls "+urls);
        mContext = this.getReactApplicationContext();
        mHandler.post(new Runnable() {
            @Override
            public void run() {

            ArrayList<Uri> fileArray = downloadImages(mContext, urls, fileNames, descriptions);

            // Hacky fix for first share
            if (fileArray.size() != urls.size()){
                Log.d("JAVABRIDGE", "Entra al hack fix");
                for (int i=0; i<urls.size(); i++) {
                    final String fileName = fileNames.getString(i);
                    File file = new File(mContext.getExternalFilesDir(Environment.DIRECTORY_PICTURES), fileName);
                    if (file.exists()) {
                        Log.d("JAVABRIDGE", "El file ya existe!");
                        fileArray.add(Uri.fromFile(file));
                    }
                }

                Log.d("JAVABRIDGE", "El files array 2: "+fileArray);

                if (fileArray.size() != urls.size()){
                    fileArray = downloadImages(mContext, urls, fileNames, descriptions);
                    Log.d("JAVABRIDGE", "El files array 3: "+fileArray);
                }
            }

            // Share intent
            if (fileArray.size() == urls.size()) {
                Intent intent = new Intent();
                intent.setAction(Intent.ACTION_SEND);
                intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                intent.setType("image/*");

                intent.setPackage("com.whatsapp");
                intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, fileArray);
                intent.putExtra(Intent.EXTRA_TEXT, text);

                mContext.startActivity(intent);
            }

            }
        });

    }

    private List<Target> targets = new ArrayList<>();

    private ArrayList<Uri> downloadImages(final Context mContext, ReadableArray urls, ReadableArray fileNames, ReadableArray descriptions){
        final ArrayList<Uri> files = new ArrayList<Uri>(urls.size());
        targets.clear();
        for (int i=0; i<urls.size(); i++) {
            final String fileName = fileNames.getString(i);
            final Uri pictureUri = Uri.parse("" + urls.getString(i));
            final String priceTag = descriptions.getString(i);

            // Check if file already exist
            File file =  new File(mContext.getExternalFilesDir(Environment.DIRECTORY_PICTURES), fileName);
            if (file.exists()) {
                Log.d("JAVABRIDGE", "El file ya existe!");
                files.add(Uri.fromFile(file));
            }

            else {
                Log.d("JAVABRIDGE", "El file no existe!");
                final Target bitmapTarget = new Target() {
                    @Override
                    public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
                        targets.clear();
                        if (!priceTag.equals("")) {
                            bitmap = drawTextToBitmap(bitmap, priceTag);
                        }
                        Uri bitmapUri = getLocalBitmapUri(bitmap, mContext, fileName);
                        files.add(bitmapUri);
                        Log.d("JAVABRIDGE", "EL bitmapUri " + bitmapUri);

                    }

                    @Override
                    public void onBitmapFailed(Drawable errorDrawable) {
                        Log.d("JAVABRIDGE", "SHARE IMAGE TARGET Ex: " + errorDrawable);
                        targets.clear();
                    }

                    @Override
                    public void onPrepareLoad(Drawable placeHolderDrawable) {
                        Log.d("JAVABRIDGE", "SHARE IMAGE TARGET onPrepareLoad: " + placeHolderDrawable);
                    }
                };
                targets.add(bitmapTarget);
                Picasso.with(mContext).load(pictureUri).resize(800, 800).centerInside().into(bitmapTarget);
            }
        }
        return files;
    }

    static private Uri getLocalBitmapUri(Bitmap bmp, Context context, String fileName) {
        Uri bmpUri = null;
        try {
            File file =  new File(context.getExternalFilesDir(Environment.DIRECTORY_PICTURES), fileName);
            if (!file.getParentFile().exists()) {
                file.getParentFile().mkdirs();
            }
            FileOutputStream out = new FileOutputStream(file);
            bmp.compress(Bitmap.CompressFormat.PNG, 90, out);
            out.close();
            bmpUri = Uri.fromFile(file);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return bmpUri;
    }

    static private Bitmap drawTextToBitmap(Bitmap bitmap, String gText) {

        android.graphics.Bitmap.Config bitmapConfig = bitmap.getConfig();
        // set default bitmap config if none
        if(bitmapConfig == null) {
            bitmapConfig = android.graphics.Bitmap.Config.ARGB_8888;
        }
        // resource bitmaps are imutable,
        // so we need to convert it to mutable one
        bitmap = bitmap.copy(bitmapConfig, true);

        Canvas canvas = new Canvas(bitmap);
        // new antialised Paint
        Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        // text color - #3D3D3D
        paint.setColor(Color.WHITE);
        // text size in pixels
        double relation = Math.sqrt(canvas.getWidth() * canvas.getHeight());
        relation = relation / 250;
        paint.setTextSize((float) (18 * relation));

        // draw text to the Canvas center
        Paint background = new Paint(Paint.ANTI_ALIAS_FLAG);
        background.setColor(Color.argb(95,91,42,208));
        Rect bounds = new Rect();
        paint.getTextBounds(gText, 0, gText.length(), bounds);

        int paddingX = 18;
        int paddingY = 18;

        int x = (int) (paddingX + 10);
        int y = (int) (bounds.height() + paddingY + 10);

        bounds.offset(x, y);
        bounds.inset(-paddingX, -paddingY);

        canvas.drawRect(bounds, background);
        canvas.drawText(gText, x, y, paint);


        return bitmap;
    }

}