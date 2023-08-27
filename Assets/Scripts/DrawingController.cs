using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DrawingController : MonoBehaviour
{
   private LineRenderer L;
   private Vector3 prevPos;
   public float minDis = 0.1f;
   public List<GameObject> Circles;
   private List<string> names = new List<string>();
    private bool lineDrawn = false;
    // Start is called before the first frame update
    void Start()
    {
        L = GetComponent<LineRenderer>();
        L.positionCount = 1;
        prevPos = transform.position;
        
    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetMouseButton(0))
        {
            Vector3 currPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            currPos.z = 0f;
            if(Vector3.Distance(currPos, prevPos) > minDis)
            {
                if(prevPos == transform.position) L.SetPosition(0,currPos);
                else
                {
                    L.positionCount++;
                    L.SetPosition(L.positionCount - 1 , currPos);
                }
                prevPos = currPos;
                lineDrawn = true;
            }
            foreach (var circle in Circles)
            {
                if(L.positionCount < 2)
                {
                    if (DoesLineIntersectCircle(L.GetPosition(0), L.GetPosition(L.positionCount - 1), circle.transform.position, circle.transform.localScale.x*0.5f))
                    {
                    // Hide or remove the intersecting circle
                       names.Add(circle.name);
                    }

                }
                else
                {
                     if (DoesLineIntersectCircle(L.GetPosition(L.positionCount - 2), L.GetPosition(L.positionCount - 1), circle.transform.position, circle.transform.localScale.x *0.5f))
                      {
                     // Hide or remove the intersecting circle
                     names.Add(circle.name);
                      }
                }
            }
        }
       else if ( lineDrawn)
        {
            
            foreach (string name in names)
                {
                   GameObject circle = Circles.Find(c => c.name == name);
                    if (circle != null)
                        {
                            circle.SetActive(false);
                        }
                }
            lineDrawn = false;
            names.Clear();
            // L.positionCount = 1; // Reset line position
        }
    }
    private bool DoesLineIntersectCircle(Vector3 lineStart, Vector3 lineEnd, Vector3 circleCenter, float circleRadius)
    {
        float distance = Vector3.Distance(circleCenter, lineStart + (lineEnd - lineStart) * 0.5f);
        return distance <= circleRadius;
    }
}
